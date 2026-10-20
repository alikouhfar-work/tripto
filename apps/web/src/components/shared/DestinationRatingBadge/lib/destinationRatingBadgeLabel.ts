export const getDestinationRatingBadgeLabel = (value: number): string => {
    if (value >= 4.5) return "Excellent"
    if (value >= 3.5) return "Very Good"
    if (value >= 2.5) return "Good"
    if (value >= 1.5) return "Fair"
    return "Poor"
}
