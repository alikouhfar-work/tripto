'use client'

import { FC } from "react"
import { DateRangePicker } from "./DateRangePicker"
import { DateRangePickerControllerProps } from "../../../types/dateRangePickerController"
import { Controller, useFormContext } from "react-hook-form"

export const DateRangePickerController: FC<DateRangePickerControllerProps> = (
    props,
) => {
    const { name, onChange, ...otherProps } = props
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <DateRangePicker
                    value={field.value}
                    onChange={(range) => {
                        field.onChange(range)
                        onChange?.(range)
                    }}
                    {...otherProps}
                />
            )}
        />
    )
}
