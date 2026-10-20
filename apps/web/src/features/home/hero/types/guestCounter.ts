export interface GuestCounterProps {
  count: number;
  title: string;
  subtitle: string;
  onIncrement: () => void;
  onDecrement: () => void;
}
