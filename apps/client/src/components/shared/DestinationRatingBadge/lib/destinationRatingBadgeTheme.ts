export const getDestinationRatingBadgeTheme = (value: number): string => {
    if (value >= 4.5) return "text-[#0284c7]"
    if (value >= 3.5) return "text-[#059669]"
    if (value >= 2.5) return "text-[#d97706]"
    if (value >= 1.5) return "text-[#ea580c]"
    return "text-[#dc2626]"
}