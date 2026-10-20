'use client';

import { useState } from 'react';
import { ColorPicker } from '@/components/ui/color-picker';

type AccommodationTagColorFieldProps = {
  id: string;
  name: string;
  defaultValue: string;
  invalid?: boolean;
};

/**
 * Shadcn color picker (HexColorPicker wrapped in a Shadcn Popover)
 * with a hidden input so the picked value submits with server-action forms.
 */
export const AccommodationTagColorField = ({
  id,
  name,
  defaultValue,
  invalid,
}: AccommodationTagColorFieldProps) => {
  const [color, setColor] = useState(defaultValue || '#000000');

  return (
    <>
      <input type="hidden" id={id} name={name} value={color} />
      <ColorPicker
        color={color}
        onChange={setColor}
        aria-invalid={invalid}
        placeholder="#000000"
      />
    </>
  );
};
