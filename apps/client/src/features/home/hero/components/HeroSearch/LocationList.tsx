import MapPinIcon from "@/assets/hero/cities/map-pin.svg"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@radix-ui/react-popover"
import { clsx } from "clsx"
import { FC, useState } from "react"
import { locations } from "../../lib/locations"
import { LocationListProps } from "../../types/locationList"

export const LocationList: FC<LocationListProps> = (props) => {
    const [selectedLocation, setSelectedLocation] = useState("")
    const { onChange } = props

    return (
        <Popover>
            <PopoverTrigger asChild>
                <h6 className="min-w-24 cursor-pointer text-base leading-4 text-zinc-400">
                    Where are you going?
                </h6>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="z-40 pt-6 focus-visible:outline-0!"
            >
                <div className="max-h-96 overflow-y-auto rounded-lg border bg-white p-4 shadow-sm">
                    <h4 className="mb-2 font-semibold text-zinc-500">
                        Around You
                    </h4>
                    <div
                        onClick={() => {
                            onChange("karaj")
                            setSelectedLocation("karaj")
                        }}
                        className={clsx(
                            "hover:border-primary-500 hover:bg-primary-50/40 relative flex cursor-pointer gap-2 rounded-lg border p-2 text-base font-semibold transition-colors duration-300",
                            selectedLocation === "karaj" &&
                            "border-primary-500 bg-primary-50/40",
                        )}
                    >
                        <MapPinIcon className="bg-primary-50 h-10 w-10 rounded-sm p-2" />
                        <div>
                            <p className="leading-4 font-semibold">Nearby</p>
                            <span className="text-[13px] text-zinc-400">
                                Iran
                            </span>
                        </div>
                    </div>
                    <h4 className="mt-6 mb-2 font-semibold text-zinc-500">
                        Suggested Destinations
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                        {locations.map((location) => {
                            const { id, cityName, countryName, value, Icon } =
                                location

                            return (
                                <li
                                    key={id}
                                    onClick={() => {
                                        onChange(value)
                                        setSelectedLocation(value)
                                    }}
                                    className={clsx(
                                        "hover:border-primary-500 hover:bg-primary-50/40 relative flex cursor-pointer gap-2 rounded-lg border p-2 text-base font-semibold transition-colors duration-300",
                                        selectedLocation === value &&
                                        "border-primary-500 bg-primary-50/40",
                                    )}
                                >
                                    <Icon className="bg-primary-50 h-10 w-10 rounded-sm p-1" />
                                    <div>
                                        <p className="leading-4 font-semibold">
                                            {cityName}
                                        </p>
                                        <span className="text-[13px] text-zinc-400">
                                            {countryName}
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    )
}
