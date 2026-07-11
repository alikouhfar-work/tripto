import { clsx } from "clsx"
import { FC } from "react"
import { DateRangePickerProps } from "../../../types/dateRangePicker"
import { Calendar } from "../../ui/calendar"

export const DateRangePicker: FC<DateRangePickerProps> = (props) => {
    const {
        min,
        max,
        value,
        onChange,
        disabled,
        className,
        numberOfMonths = 1,
    } = props

    return (
        <Calendar
            min={min}
            max={max}
            mode="range"
            required={true}
            selected={value}
            disabled={disabled}
            numberOfMonths={numberOfMonths}
            className={clsx(className, "rounded-lg border shadow-sm")}
            onSelect={onChange}
        />
    )
}
