import { clsx } from "clsx"
import { FC } from "react"
import { IDestinationRatingBadgeProps } from "./types/destinationRatingBadge"
import { destinationRatingBadgeConfig } from "./lib/destinationRatingBadgeConfig"
import { getDestinationRatingBadgeTheme } from "./lib/destinationRatingBadgeTheme"
import { getDestinationRatingBadgeLabel } from "./lib/destinationRatingBadgeLabel"

export const DestinationRatingBadge: FC<IDestinationRatingBadgeProps> = (props) => {
    const {
        side = "left",
        size = "small",
        direction = "horizontal",
        rating = 1,
        reviewCount,
        showReview = true,
        showReviewCount = true,
        showReviewExpression = true,
    } = props

    const ratingBadgeTheme = getDestinationRatingBadgeTheme(rating)
    const ratingBadgeLabel = getDestinationRatingBadgeLabel(rating)
    const shouldColorizeMain =
        !showReview || (!showReviewCount && !showReviewExpression)

    return (
        <div className="flex gap-1.5">
            <div
                className={clsx(
                    "bg-zinc-50",
                    size === "small"
                        ? "text-sm font-semibold"
                        : "text-base font-bold",
                    shouldColorizeMain && ratingBadgeTheme,
                    destinationRatingBadgeConfig[direction][size][side],
                    destinationRatingBadgeConfig[direction][size].container,
                )}
            >
                {rating}
            </div>

            {showReview && (
                <div
                    className={clsx(
                        "flex",
                        direction === "horizontal"
                            ? "items-center gap-1"
                            : "flex-col",
                    )}
                >
                    {showReviewExpression && (
                        <p
                            className={clsx(
                                ratingBadgeTheme,
                                size === "small"
                                    ? "text-xs font-semibold"
                                    : "text-sm font-bold",
                            )}
                        >
                            {ratingBadgeLabel}
                        </p>
                    )}

                    {showReviewCount && (
                        <span
                            className={clsx(
                                "text-zinc-400",
                                size === "small" ? "text-[10px]" : "text-xs",
                            )}
                        >
                            {reviewCount} Reviews
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}
