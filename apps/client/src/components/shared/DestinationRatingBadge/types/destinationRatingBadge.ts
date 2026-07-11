export interface IDestinationRatingBadgeProps {
    rating: number
    reviewCount: number
    showReview?: boolean
    showReviewCount?: boolean
    showReviewExpression?: boolean
    side?: "left" | "right"
    size?: "small" | "large"
    direction?: "horizontal" | "vertical"
}