export interface GuestCounterProps {
    value: number
    label: string
    subtitle: string
    onChange: (value: number) => void
}