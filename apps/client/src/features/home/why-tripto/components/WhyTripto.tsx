import Path from "@/assets/why-tripto/path.svg"
import { FC } from "react"
import { reasons } from "../lib/reasons"

export const WhyTripto: FC = () => {
    return (
        <section className="w-full max-w-7xl">
            <ul className="flex flex-col items-center justify-between gap-6 md:flex-row">
                {reasons.map((reason, index) => {
                    const { Icon, title, description } = reason
                    const isLastReason = reasons.length - 1 === index

                    return (
                        <li
                            key={reason.id}
                            className="flex max-w-56 flex-col items-center text-center"
                        >
                            <div className="relative mb-2 size-20 md:mb-6 md:size-24">
                                <Icon className="bg-primary-50 h-full w-full rounded-3xl p-6" />
                                {!isLastReason && (
                                    <Path
                                        width={346}
                                        height={85}
                                        className="absolute bottom-2 left-[calc(100%+40px)] hidden xl:block"
                                    />
                                )}
                            </div>
                            <p className="text-lg leading-10 font-bold capitalize md:text-2xl md:font-semibold">
                                {title}
                            </p>
                            <span className="">{description}</span>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}