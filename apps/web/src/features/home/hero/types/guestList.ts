export interface GuestListProps {
    value?: string
    onChange: (
        guests: Array<Record<"adult" | "child" | "infant", number>>,
    ) => void
}
