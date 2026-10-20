'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

type DetailMapProps = {
  latitude?: number | null;
  longitude?: number | null;
  title?: string;
  className?: string;
};

const ModernMapPin = ({ color = '#3b82f6' }: { color?: string }) => (
  <svg
    width="36"
    height="48"
    viewBox="0 0 36 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
  >
    <path
      d="M18 2C8.268 2 0 10.268 0 20c0 10.5 18 28 18 28s18-17.5 18-28C36 10.268 27.732 2 18 2z"
      fill={color}
      stroke="white"
      strokeWidth="2"
    />
    <circle cx="18" cy="20" r="6" fill="white" />
  </svg>
);

export const DetailMap = ({
  latitude,
  longitude,
  title,
  className = 'h-64 w-full rounded-xl',
}: DetailMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // SSR-safe: Leaflet requires `window`. Skip rendering until mounted.
  const [mounted, setMounted] = useState(false);

  const modernPinIcon = useMemo(() => {
    return L.divIcon({
      className: 'modern-map-pin',
      html: renderToStaticMarkup(
        <div className="flex items-center justify-center">
          <ModernMapPin color="#3b82f6" />
        </div>
      ),
      iconSize: [36, 48],
      iconAnchor: [18, 48],
      popupAnchor: [0, -48],
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mounted flag keeps SSR HTML stable until hydration completes
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current) return;
    if (latitude == null || longitude == null) return;

    // Lazy-import Leaflet after mount so SSR doesn't hit window/document.
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- Leaflet has no ESM export; dynamic require avoids SSR `window` access
    const L = require('leaflet');

    // Remove any stale instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    if (markerRef.current) {
      markerRef.current = null;
    }

    const map = L.map(mapRef.current!, {
      center: [latitude, longitude],
      zoom: 14,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      touchZoom: false,
    });
    mapInstanceRef.current = map;

    // Free OpenStreetMap tiles (no API key required)
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      },
    ).addTo(map);

    const marker = L.marker([latitude, longitude], { icon: modernPinIcon }).addTo(map);
    markerRef.current = marker;

    if (title) marker.bindPopup(title).openPopup();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, [mounted, latitude, longitude, title, modernPinIcon]);

  if (!mounted) {
    return (
      <div className={`${className} bg-muted/30 rounded-xl flex items-center justify-center`} aria-hidden="true">
        <span className="text-sm text-muted-foreground">Loading map…</span>
      </div>
    );
  }

  if (latitude == null || longitude == null) {
    return (
      <div className={`${className} bg-muted/30 rounded-xl flex items-center justify-center`}>
        <span className="text-sm text-muted-foreground">No coordinates available</span>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};