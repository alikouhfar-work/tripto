import {clsx} from "clsx"
import {FC, PropsWithChildren} from "react"
import {buttonPrimaryBaseClass, buttonPrimaryLoadingBaseClass} from "./lib/buttonPrimaryBaseClass"
import {buttonPrimarySize} from "./lib/buttonPrimarySize"
import {buttonPrimaryTheme} from "./lib/buttonPrimaryTheme"
import {IButtonPrimaryProps} from "./types"
import {Button} from "@/components/ui/button";

export const ButtonPrimary: FC<PropsWithChildren<IButtonPrimaryProps>> = ({
    type = "button",
    color = "primary",
    variant = "solid",
    size = "medium",
    LeftIconElement,
    RightIconElement,
    isDisabled,
    isLoading,
    className,
    onClick,
    children,
}) => {
    if (isLoading) {
        return (
            <Button
                className={clsx(
                    buttonPrimaryLoadingBaseClass,
                    buttonPrimarySize[size].button,
                    buttonPrimaryTheme.button.loading[color][variant],
                    className,
                )}
                aria-busy="true"
            >
                {/*<LoadingSpinner color={color} size={size} />*/}
            </Button>
        )
    }

    return (
        <Button
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            className={clsx(
                buttonPrimaryBaseClass,
                buttonPrimarySize[size].button,
                buttonPrimaryTheme.button[color][variant],
                className,
            )}
        >
            {LeftIconElement}
            {children}
            {RightIconElement}
        </Button>
    )
}
