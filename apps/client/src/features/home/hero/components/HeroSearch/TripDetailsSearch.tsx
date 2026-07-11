"use client"

import {Popover, PopoverContent, PopoverTrigger,} from "@radix-ui/react-popover"
import {SearchIcon} from "lucide-react"
import {FC} from "react"
import {FormProvider, useForm, useWatch} from "react-hook-form"
import {TripDetailsSearchFormSchema} from "../../types/tripDetailsSearch"
import {GuestList} from "./GuestsList"
import {LocationList} from "./LocationList"
import {useRouter} from "next/navigation"
import {ButtonPrimary} from "@/components/shared/ButtonPrimary/ButtonPrimary";
import {formatDate} from "@/utils/formatDate";
import {DateRangePickerController} from "@/components/shared/DateRangePicker";

export const TripDetailsSearch: FC = () => {
    const router = useRouter()
    const form = useForm<TripDetailsSearchFormSchema>({
        defaultValues: {
            range: undefined,
            location: "",
            guests: [],
        },
    })

    const { control, setValue, handleSubmit } = form
    const dateRange = useWatch({
        control: control,
        name: "range",
    })

    const onSubmit = (formData: TripDetailsSearchFormSchema) => {
        console.log(formData)
        router.replace('/destinations')
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex min-w-80 flex-col items-center gap-6 rounded-2xl bg-white p-4 pt-14 shadow md:w-fit md:flex-row md:gap-4"
            >
                <ul className="flex flex-col divide-y md:flex-row md:items-center md:divide-x md:divide-y-0">
                    <li className="pb-3 md:pr-20">
                        <h5 className="text-lg font-semibold">Location</h5>
                        <LocationList
                            onChange={(location) =>
                                setValue("location", location)
                            }
                        />
                    </li>
                    <li className="py-3 md:px-6">
                        <h5 className="text-lg font-semibold">Check In</h5>
                        <Popover>
                            <PopoverTrigger asChild>
                                <h6 className="min-w-24 cursor-pointer text-base leading-4 text-zinc-400">
                                    {dateRange?.from
                                        ? formatDate(dateRange.from, {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                        })
                                        : "Pick a date"}
                                </h6>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="z-40 pt-6">
                                <DateRangePickerController
                                    name="range"
                                    numberOfMonths={2}
                                    disabled={{
                                        before: new Date(),
                                    }}
                                    onChange={(range) =>
                                        setValue("range", {
                                            from: range.from,
                                            to: dateRange?.to,
                                        })
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </li>
                    <li className="py-3 md:px-6">
                        <h5 className="text-lg font-semibold">Check Out</h5>
                        <Popover>
                            <PopoverTrigger asChild>
                                <h6 className="min-w-24 cursor-pointer text-base leading-4 text-zinc-400">
                                    {dateRange?.to
                                        ? formatDate(dateRange.to, {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                        })
                                        : "Pick a date"}
                                </h6>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="z-40 pt-6">
                                <DateRangePickerController
                                    name="range"
                                    numberOfMonths={2}
                                    disabled={{
                                        before: new Date(),
                                    }}
                                    onChange={(range) =>
                                        setValue("range", {
                                            from: dateRange?.from,
                                            to: range.to,
                                        })
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </li>
                    <li className="pt-3 md:pr-20 md:pl-6">
                        <h5 className="text-lg font-semibold">
                            Rooms and Guests
                        </h5>
                        <GuestList
                            onChange={(guests) => setValue("guests", guests)}
                        />
                    </li>
                </ul>
                <ButtonPrimary
                    type="submit"
                    size="medium"
                    LeftIconElement={<SearchIcon />}
                >
                    Search
                </ButtonPrimary>
            </form>
        </FormProvider>
    )
}