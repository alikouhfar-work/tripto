import type { DateRange } from "react-day-picker"

export interface DateRangePickerProps {
    min?: number
    max?: number
    value: DateRange
    onChange?: (value: DateRange) => void
    numberOfMonths?: number
    defaultDate?: DateRange
    className?: string
    disabled?: {
        after?: Date
        before: Date
    }
}
