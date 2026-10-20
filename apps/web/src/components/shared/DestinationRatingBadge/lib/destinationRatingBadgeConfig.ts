export const destinationRatingBadgeConfig = {
    vertical: {
        small: {
            container: "size-8 flex items-center justify-center",
            left: "rounded-bl-[8px] rounded-br-[12px] rounded-tr-[12px]",
            right: "rounded-br-[8px] rounded-bl-[12px] rounded-tl-[12px]",
        },
        large: {
            container: "size-10 flex items-center justify-center",
            left: "rounded-bl-[10px] rounded-br-[15px] rounded-tr-[15px]",
            right: "rounded-br-[10px] rounded-bl-[15px] rounded-tl-[15px]",
        },
    },
    horizontal: {
        small: {
            container: "w-8 h-6 flex items-center justify-center",
            left: "rounded-bl-[10px] rounded-br-[15px] rounded-tr-[15px]",
            right: "rounded-br-[10px] rounded-bl-[15px] rounded-tl-[15px]",
        },
        large: {
            container: "w-10 h-8 flex items-center justify-center",
            left: "rounded-bl-[10px] rounded-br-[15px] rounded-tr-[15px]",
            right: "rounded-br-[10px] rounded-bl-[15px] rounded-tl-[15px]",
        },
    },
} as const