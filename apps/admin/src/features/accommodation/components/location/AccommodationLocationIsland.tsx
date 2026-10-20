'use client';

import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { NumberInput } from '@/components/shared/NumberInput';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';
import { IconMapPin } from '@tabler/icons-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';

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

export type AccommodationLocationInitial = {
  country?: string;
  countryCode?: string;
  city?: string;
  fullAddress?: string;
  latitude?: number | null;
  longitude?: number | null;
};

type AccommodationLocationIslandProps = {
  initial?: AccommodationLocationInitial;
  defaults?: AccommodationLocationInitial;
  errors?: Record<string, string>;
};

const LocationMarker = ({ latitude, longitude, icon, onSelect }: {
  latitude: number | null;
  longitude: number | null;
  icon: L.DivIcon;
  onSelect: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return latitude != null && longitude != null ? (
    <Marker position={[latitude, longitude]} icon={icon} />
  ) : null;
};

const RecenterMap = ({ lat, lng }: { lat?: number | null; lng?: number | null }) => {
  const map = useMap();

  useEffect(() => {
    if (lat != null && lng != null) {
      map.setView([lat, lng], 15, {
        animate: true,
      });
    }
  }, [lat, lng, map]);

  return null;
};

export const AccommodationLocationIsland = ({
  initial,
  defaults,
  errors,
}: AccommodationLocationIslandProps) => {
  const source = defaults ?? initial;
  const [latitude, setLatitude] = useState<number | null>(source?.latitude ?? null);
  const [longitude, setLongitude] = useState<number | null>(source?.longitude ?? null);
  const [countryCode, setCountryCode] = useState(source?.countryCode ?? '');

  const customMarkerIcon = useMemo(() => {
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

  const onMapSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <ModificationFormSection icon={IconMapPin} title="Address">
      <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
        <div className="z-1 mb-6 h-100 overflow-hidden rounded-lg border border-zinc-200 md:col-span-3">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[latitude ?? 52.52, longitude ?? 13.4049]}
            zoom={latitude != null && longitude != null ? 8 : 10}
          >
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {latitude && longitude && <RecenterMap lat={latitude} lng={longitude} />}
            <LocationMarker
              latitude={latitude}
              longitude={longitude}
              icon={customMarkerIcon}
              onSelect={onMapSelect}
            />
          </MapContainer>
        </div>

        <FieldWithError required label="Country" htmlFor="country" error={errors?.country}>
          <Input
            id="country"
            name="country"
            defaultValue={source?.country ?? ''}
            placeholder="Enter a country"
            aria-invalid={Boolean(errors?.country)}
          />
        </FieldWithError>

        <FieldWithError
          required
          label="Country Code"
          htmlFor="countryCode"
          error={errors?.countryCode}
        >
          <InputGroup>
            <InputGroupInput
              id="countryCode"
              name="countryCode"
              defaultValue={source?.countryCode ?? ''}
              placeholder="Enter a country code"
              onChange={(event) => setCountryCode(event.target.value)}
              aria-invalid={Boolean(errors?.countryCode)}
            />
            <InputGroupAddon align="inline-end">
              {countryCode.length === 2 && convertCountryCodeToFlag(countryCode)}
            </InputGroupAddon>
          </InputGroup>
        </FieldWithError>

        <FieldWithError required htmlFor="city" label="City" error={errors?.city}>
          <Input
            id="city"
            name="city"
            defaultValue={source?.city ?? ''}
            placeholder="Enter a city"
            aria-invalid={Boolean(errors?.city)}
          />
        </FieldWithError>

        <FieldWithError
          required
          label="Full Address"
          htmlFor="fullAddress"
          error={errors?.fullAddress}
        >
          <Input
            id="fullAddress"
            name="fullAddress"
            defaultValue={source?.fullAddress ?? ''}
            placeholder="Enter full address"
            aria-invalid={Boolean(errors?.fullAddress)}
          />
        </FieldWithError>

        <FieldWithError required label="Latitude" htmlFor="latitude" error={errors?.latitude}>
          <NumberInput
            id="latitude"
            name="latitude"
            step="any"
            value={latitude ?? ''}
            placeholder="Enter a latitude"
            onChange={(event) => {
              const value = event.target.value;
              setLatitude(value === '' ? null : Number(value));
            }}
            aria-invalid={Boolean(errors?.latitude)}
          />
        </FieldWithError>

        <FieldWithError required label="Longitude" htmlFor="longitude" error={errors?.longitude}>
          <NumberInput
            id="longitude"
            name="longitude"
            step="any"
            value={longitude ?? ''}
            placeholder="Enter a longitude"
            onChange={(event) => {
              const value = event.target.value;
              setLongitude(value === '' ? null : Number(value));
            }}
            aria-invalid={Boolean(errors?.longitude)}
          />
        </FieldWithError>
      </div>
    </ModificationFormSection>
  );
};
