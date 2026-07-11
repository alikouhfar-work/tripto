"use client"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { FC, useState } from "react"
import { propertyTypes } from "../../lib/propertyTypes"

export const PropertyTypeSearch: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <ul className="absolute -top-10 flex w-11/12 items-center gap-0.5 overflow-x-auto rounded-full bg-black/30 p-4 backdrop-blur md:w-fit">
            {propertyTypes.map((propertyType, index) => {
                const { Icon } = propertyType
                const isActive = currentIndex === index

                return (
                    <li
                        key={propertyType.value}
                        onClick={() => setCurrentIndex(index)}
                        className={clsx(
                            "relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-base font-semibold transition-colors duration-300",
                            isActive
                                ? "text-black"
                                : "text-white hover:text-zinc-900",
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-bg"
                                className="absolute inset-0 rounded-full bg-white shadow-lg"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 50,
                                }}
                            />
                        )}
                        <Icon width={22} height={22} className="z-10" />
                        <p className="z-10 flex-1 text-sm text-nowrap md:text-base">
                            {propertyType.title}
                        </p>
                    </li>
                )
            })}
        </ul>
    )
}