'use client';

import { IconX, IconColorSwatch, IconPalette } from '@tabler/icons-react';
import { useState, useRef, useEffect, useCallback, type ChangeEvent, type FocusEvent } from 'react';

const PRESET_COLORS = [
  '#000000', '#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6', '#ffffff',
  '#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2', '#fff1f2', '#fdf2f8', '#fce7f3', '#fbcfe8',
  '#f97316', '#fb923c', '#fdba74', '#ffedd5', '#fff7ed', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24',
  '#eab308', '#facc15', '#fde047', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212',
  '#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7', '#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac',
  '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe', '#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9',
  '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd',
  '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd',
  '#d946ef', '#f0abfc', '#f9a8d4', '#fce7f3', '#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6',
];

type ColorPickerProps = {
  value: string;
  /** Optional: kept in sync via the hidden `formName` input when omitted (server-form usage). */
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  error?: string;
  required?: boolean;
  /** Hidden input for form submission */
  formName?: string;
};

export const ColorPicker = (props: ColorPickerProps) => {
  const { value, onChange, name, id, error, required, formName } = props;
  const [open, setOpen] = useState(false);
  const [hexValue, setHexValue] = useState(() => value);
  const [recentColors, setRecentColors] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recent-colors');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const svCanvasRef = useRef<HTMLCanvasElement>(null);
  const hueCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingSV = useRef(false);
  const isDraggingHue = useRef(false);

  // Sync hexValue with value prop when it changes
  if (hexValue !== value) {
    setHexValue(value);
  }

  // HSV to Hex conversion
  const hsvToHex = (h: number, s: number, v: number): string => {
    s /= 100; v /= 100;
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const hexToHsv = (hex: string): { h: number; s: number; v: number } | null => {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return null;
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
      if (max === r) h = 60 * ((g - b) / delta % 6);
      else if (max === g) h = 60 * ((b - r) / delta + 2);
      else h = 60 * ((r - g) / delta + 4);
      if (h < 0) h += 360;
    }
    const s = max === 0 ? 0 : (delta / max) * 100;
    const v = max * 100;
    return { h, s, v };
  };

  // Draw saturation/value canvas
  const drawSVCanvas = useCallback(() => {
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    // White to color gradient (horizontal = saturation)
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    // Black overlay (vertical = value)
    const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
    blackGradient.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, width, height);
  }, [hue]);

  // Draw hue slider canvas
  const drawHueCanvas = useCallback(() => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    for (let i = 0; i <= 360; i += 30) {
      gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Update canvases on mount and hue change
  useEffect(() => { drawSVCanvas(); drawHueCanvas(); }, [drawSVCanvas, drawHueCanvas]);

  // Sync hexValue with value prop when it changes
  if (hexValue !== props.value) {
    setHexValue(props.value);
    const hsv = hexToHsv(props.value);
    if (hsv) { setHue(hsv.h); setSaturation(hsv.s); setBrightness(hsv.v); }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mouse handlers for color picker
  const handleSVDrag = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingSV.current) return;
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setSaturation(Math.round(x * 100));
    setBrightness(Math.round((1 - y) * 100));
    const hex = hsvToHex(hue, x * 100, (1 - y) * 100);
    setHexValue(hex);
    onChange?.(hex);
  };

  const handleHueDrag = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingHue.current) return;
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const newHue = Math.round(y * 360);
    setHue(newHue);
    const hex = hsvToHex(newHue, saturation, brightness);
    setHexValue(hex);
    onChange?.(hex);
  };

  const handleSVMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingSV.current = true;
    handleSVDrag(e);
  };
  const handleHueMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingHue.current = true;
    handleHueDrag(e);
  };
  const handleMouseUp = () => {
    isDraggingSV.current = false;
    isDraggingHue.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSV.current) handleSVDrag(e as unknown as React.MouseEvent<HTMLCanvasElement>);
      if (isDraggingHue.current) handleHueDrag(e as unknown as React.MouseEvent<HTMLCanvasElement>);
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setHexValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange?.(newValue);
      addToRecent(newValue);
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = newValue;
      }
    }
  };

  const handleColorPick = (color: string) => {
    onChange?.(color);
    setHexValue(color);
    addToRecent(color);
    setOpen(false);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = color;
    }
  };

  const addToRecent = (color: string) => {
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c !== color);
      const updated = [color, ...filtered].slice(0, 10);
      if (typeof window !== 'undefined') {
        localStorage.setItem('recent-colors', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleInputFocus = () => setOpen(true);
  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setTimeout(() => setOpen(false), 100);
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      {formName && (
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={formName}
          value={value}
          readOnly
        />
      )}
      <div className="flex items-center gap-2">
        <div className="relative">
          <IconColorSwatch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="text"
            value={hexValue}
            onChange={handleHexChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="#RRGGBB"
            required={required}
            aria-invalid={Boolean(error)}
            className="h-10 w-full pl-9 pr-3 rounded-lg border border-zinc-200 bg-zinc-50/50 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-950/70 dark:focus:border-blue-400"
          />
          {hexValue && (
            <button
              type="button"
              onClick={() => {
                setHexValue('#000000');
                onChange?.('#000000');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconX size={14} />
            </button>
          )}
        </div>
        <div
          className="h-10 w-10 shrink-0 rounded-lg border border-zinc-200 bg-white cursor-pointer transition-colors hover:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
          style={{ backgroundColor: value }}
          onClick={() => setOpen(!open)}
          title="Open color palette"
        >
          <IconPalette size={18} className="mx-auto my-auto text-muted-foreground" />
        </div>
      </div>

      {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {open && (
        <div
          className="fixed z-50 mt-1 w-88 rounded-lg border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-950"
          style={{
            transform: 'translateX(-50%)',
            left: '50%',
          }}
        >
          <div className="mb-3 flex items-center justify-between text-sm font-medium text-foreground">
            <span>Color Picker</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <IconX size={16} />
            </button>
          </div>

          {/* HSV Color Picker */}
          <div className="mb-4 space-y-3">
            {/* Saturation/Value Square */}
            <div className="relative">
              <canvas
                ref={svCanvasRef}
                width={256}
                height={156}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-crosshair"
                onMouseDown={handleSVMouseDown}
              />
              {/* Cursor */}
              <div
                className="pointer-events-none absolute rounded-full border-2 border-white shadow-lg"
                style={{
                  left: `${(saturation / 100) * 256 - 6}px`,
                  top: `${(1 - brightness / 100) * 156 - 6}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="size-4 rounded-full border-2 border-white/50" />
              </div>
            </div>

            {/* Hue Slider */}
            <div className="relative h-5 w-full">
              <canvas
                ref={hueCanvasRef}
                width={256}
                height={16}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                onMouseDown={handleHueMouseDown}
              />
              <div
                className="pointer-events-none absolute top-0 h-5 w-1 bg-white shadow-lg"
                style={{
                  left: `${(hue / 360) * 256}px`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="h-full bg-white/50" />
              </div>
            </div>
          </div>

          {recentColors.length > 0 && (
            <div className="mb-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Recent</p>
              <div className="flex flex-wrap gap-1.5">
                {recentColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorPick(color)}
                    className="size-8 rounded border-2 cursor-pointer transition-transform hover:scale-110"
                    style={{ backgroundColor: color, borderColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Presets</p>
            <div className="grid grid-cols-9 gap-1.5 max-h-64 overflow-y-auto">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorPick(color)}
                  className="size-8 rounded border-2 cursor-pointer transition-transform hover:scale-110"
                  style={{ backgroundColor: color, borderColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export type { ColorPickerProps };