import { FC } from "react"
import { TripDetailsSearch } from "./TripDetailsSearch"
import { PropertyTypeSearch } from "./PropertyTypeSearch"

export const HeroSearch: FC = () => {
    return (
        <section className="absolute -bottom-8 flex w-full justify-center">
            <PropertyTypeSearch />
            <TripDetailsSearch />
        </section>
    )
}