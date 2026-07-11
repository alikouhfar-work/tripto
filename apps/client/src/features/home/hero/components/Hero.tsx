import { FC } from "react"
import { HeroGallery } from "./HeroGallery"
import { HeroSearch } from "./HeroSearch/HeroSearch"

export const Hero: FC = () => {
    return (
        <article className="relative">
            <HeroGallery />
            <HeroSearch />
        </article>
    )
}
