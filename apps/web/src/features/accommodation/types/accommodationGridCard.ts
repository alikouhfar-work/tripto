import {Accommodation} from "@/features/accommodation/types/accommodation";

export type AccommodationGridCardProps = {
  isSaved?: boolean;
  accommodation: Accommodation;
  onToggleSaveProperty?: (id: string) => void;
  onSelectProperty?: (accommodation: Accommodation) => void;
};
