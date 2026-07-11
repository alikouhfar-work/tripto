import {IButtonIconProps} from "@/components/shared/ButtonIcon/types";
import {FC, PropsWithChildren} from "react";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {buttonIconBaseClass, buttonIconLoadingBaseClass} from "@/components/shared/ButtonIcon/lib/buttonIconBaseClass";
import {buttonIconSize} from "@/components/shared/ButtonIcon/lib/buttonIconSize";
import {buttonIconTheme} from "@/components/shared/ButtonIcon/lib/buttonIconTheme";

export const ButtonIcon: FC<PropsWithChildren<IButtonIconProps>> = ({
    type = "button",
    color = "primary",
    variant = "solid",
    size = "medium",
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
                    buttonIconLoadingBaseClass,
                    buttonIconSize[size].button,
                    buttonIconTheme.button.loading[color][variant],
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
                buttonIconBaseClass,
                buttonIconSize[size].button,
                buttonIconTheme.button[color][variant],
                className,
            )}
        >
            {children}
        </Button>
    )
}
