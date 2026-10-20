import { AccommodationAmenity } from '../../types/accommodationAmenity';
import { Currency } from '@repo/database';

export type Beds = {
  king?: number;
  queen?: number;
  double?: number;
  single?: number;
};

export type Room = {
  id: string;
  beds: Beds | null;
  area: number;
  title: string;
  count: number;
  price: number;
  hotelId: string;
  capacity: number;
  bathrooms: number;
  currency: Currency;
  currencyId: string;
  discount: number | null;
  bedrooms: number | null;
  createdById: string | null;
  updatedById: string | null;
  amenities: Array<AccommodationAmenity>;
  galleryImages?: File[] | null;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomInput = {
  id?: string;
  title: string;
  area: number;
  count: number;
  price: number;
  currencyId: string;
  discount?: number | null;
  capacity: number;
  bedrooms?: number | null;
  bathrooms: number;
  amenities: Array<AccommodationAmenity>;
  beds?: Beds;
};

export type RoomOption = {
  value: string;
  label: string;
};

export type RoomProps = {
  error?: string;
  fields: Array<Room>;
  accommodationId?: string;
  currencyOptions?: Array<RoomOption>;
  onRemove: (index: number) => void;
  onAppend: (value: Room) => void;
  onUpdate: (index: number, val: Room) => void;
};

export type RoomItemProps = {
  item: Room;
  /** Inline-form flow (e.g. accommodation create/edit). Falls back to the rooms edit route. */
  onEdit?: () => void;
  /** Inline-form flow (e.g. accommodation create/edit). Falls back to the delete dialog. */
  onRemove?: () => void;
  accommodationId?: string;
  /** When true, deletion is blocked with a toast (a hotel must keep at least one room). */
  isLastRoom?: boolean;
};

export type RoomFormProps = {
  fields: Array<Room>;
  accommodationId?: string;
  currencyOptions?: Array<RoomOption>;
  currentItem: SelectedRoom;
  closeHandler: () => void;
  createHandler: (room: Room) => void;
  updateHandler: (index: number, room: Room) => void;
};

export type SelectedRoom = {
  room: Room | null;
  index?: number;
};
