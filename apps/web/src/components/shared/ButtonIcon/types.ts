import { MouseEventHandler } from "react"

export type ButtonVariant = "solid" | "outline" | "text"
export type ButtonColor = "primary" | "secondary" | 'danger'
export type ButtonSize = "extraSmall" | "small" | "medium" | "large"

export interface IButtonIconProps {
    type?: HTMLButtonElement["type"]
    color?: ButtonColor
    variant?: ButtonVariant
    size?: ButtonSize
    isDisabled?: boolean
    isLoading?: boolean
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}
