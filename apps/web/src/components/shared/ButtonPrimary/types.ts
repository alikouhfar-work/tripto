import { MouseEventHandler, ReactNode } from "react"

export type ButtonVariant = "solid" | "outline" | "text"
export type ButtonColor = "primary" | "secondary"
export type ButtonSize = "extraSmall" | "small" | "medium" | "large"

export interface IButtonPrimaryProps {
    type?: HTMLButtonElement["type"]
    color?: ButtonColor
    variant?: ButtonVariant
    size?: ButtonSize
    isDisabled?: boolean
    isLoading?: boolean
    RightIconElement?: ReactNode
    LeftIconElement?: ReactNode
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}
