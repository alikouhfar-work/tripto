"use client"

import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { heroGallery } from "../lib/heroGallery"

export const HeroGallery: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === heroGallery.length - 1 ? 0 : prevIndex + 1,
            )
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    const currentImage = heroGallery[currentIndex]

    return (
        <div className="relative h-150 w-full">
            <div
                key={currentIndex}
                className="animate-fadeIn absolute h-full w-full"
            >
                <Image
                    fill
                    src={currentImage!.src}
                    alt={currentImage!.alt}
                    className="absolute object-cover"
                    priority={currentIndex === 0}
                />
            </div>
            <div className="bg-primary-800/40 absolute flex h-full w-full flex-col items-center justify-center text-white">
                <h2 className="text-6xl font-extrabold">
                    Your Trip Starts Here
                </h2>
                <h3 className="text-3xl font-semibold capitalize">
                    Find unique stays across hotels, villas, and more.
                </h3>
            </div>
        </div>
    )
}