export const buttonIconTheme = {
    button: {
        primary: {
            solid: "bg-primary-500 text-white not-disabled:hover:bg-primary-600 disabled:bg-zinc-50 focus:bg-primary-300 disabled:text-zinc-200",
            outline:
                "border border-primary-500 text-primary-500 bg-transparent not-disabled:hover:bg-transparent not-disabled:hover:border-primary-600 not-disabled:hover:text-primary-400 focus:border-primary-300 focus:text-primary-300 disabled:text-zinc-200 disabled:border-zinc-200",
            text: "text-primary-500 bg-transparent not-disabled:hover:bg-transparent not-disabled:hover:text-primary-600 focus:text-primary-300 disabled:text-zinc-200",
        },
        secondary: {
            solid: "bg-zinc-700 text-white not-disabled:hover:bg-zinc-900 disabled:bg-zinc-50 focus:bg-zinc-600 disabled:text-zinc-200",
            outline:
                "border border-zinc-700 text-zinc-700 bg-white not-disabled:hover:bg-zinc-50 focus:border-zinc-900 focus:bg-transparent disabled:text-zinc-200 disabled:border-zinc-200",
            text: "text-zinc-700 bg-transparent not-disabled:hover:bg-zinc-50 focus:text-zinc-900 disabled:text-zinc-200",
        },
        danger: {
            solid: "bg-error-500 text-white not-disabled:hover:bg-error-800 disabled:bg-error-100/50 focus:bg-error-600 disabled:text-error-200",
            outline:
                "border border-error-500 text-error-500 bg-white not-disabled:hover:bg-error-100/50 focus:border-error-800 focus:bg-transparent disabled:text-error-200 disabled:border-error-200",
            text: "text-error-500 bg-transparent not-disabled:hover:bg-error-100/50 focus:text-error-800 disabled:text-error-200",
        },
        loading: {
            primary: {
                solid: "bg-primary-100 hover:bg-primary-100",
                outline: "border border-primary-100 bg-transparent",
                text: "bg-transparent",
            },
            secondary: {
                solid: "bg-zinc-100 hover:bg-zinc-100",
                outline: "border border-zinc-100 bg-transparent",
                text: "bg-transparent",
            },
            danger: {
                solid: "bg-error-100 hover:bg-error-100",
                outline: "border border-error-100 bg-transparent",
                text: "bg-transparent",
            },
        },
    },
    icon: {
        primary: "stroke-primary-700",
        secondary: "stroke-zinc-700",
    },
} as const