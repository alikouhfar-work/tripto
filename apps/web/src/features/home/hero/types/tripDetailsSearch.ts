import { DateRange } from "react-day-picker"

export type TripDetailsSearchFormSchema = {
    range: DateRange
    location: string
    guests: Array<{
        adult: number
        child: number
        infant: number
    }>
}
