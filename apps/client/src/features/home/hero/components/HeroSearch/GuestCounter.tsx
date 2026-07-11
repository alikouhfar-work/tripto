import {MinusIcon, PlusIcon} from "lucide-react"
import {FC} from "react"
import {ButtonIcon} from "@/components/shared/ButtonIcon/ButtonIcon";
import {GuestCounterProps} from "@/features/home/hero/types/guestCounter";

export const GuestCounter: FC<GuestCounterProps> = ({
    label,
    subtitle,
    value,
    onChange,
}) => {
    return (
        <li className="flex items-start justify-between gap-10">
            <div>
                <p className="leading-4 font-semibold">{label}</p>
                <span className="text-[13px] leading-3 text-zinc-400">
                    {subtitle}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <ButtonIcon
                    variant="outline"
                    size="extraSmall"
                    color="secondary"
                    isDisabled={value === 0}
                    onClick={() => onChange(-1)}
                >
                    <MinusIcon />
                </ButtonIcon>

                <p className="min-w-5 text-center">{value}</p>

                <ButtonIcon
                    variant="outline"
                    size="extraSmall"
                    onClick={() => onChange(1)}
                >
                    <PlusIcon />
                </ButtonIcon>
            </div>
        </li>
    )
}
