import {Popover, PopoverContent, PopoverTrigger,} from "@radix-ui/react-popover"
import {PlusIcon, Trash} from "lucide-react"
import {FC, useState} from "react"
import {GuestListProps} from "@/features/home/hero/types/guestList";
import {ButtonIcon} from "@/components/shared/ButtonIcon/ButtonIcon";
import {guestTypes} from "@/features/home/hero/lib/guestTypes";
import {GuestCounter} from "@/features/home/hero/components/HeroSearch/GuestCounter";
import {ButtonPrimary} from "@/components/shared/ButtonPrimary/ButtonPrimary";

export const GuestList: FC<GuestListProps> = (props) => {
    const { onChange } = props

    const [selectedGuests, setSelectedGuests] = useState([
        { adult: 0, child: 0, infant: 0 },
    ])

    const onUpdateRoom = (
        roomIndex: number,
        field: "adult" | "child" | "infant",
        amount: number,
    ) => {
        setSelectedGuests((prev) => {
            const roomGuests = prev.map((room, i) =>
                i === roomIndex
                    ? { ...room, [field]: Math.max(0, room[field] + amount) }
                    : room,
            )

            onChange(roomGuests)
            return roomGuests
        })
    }

    const onAddRoom = () => {
        setSelectedGuests((prev) => [
            ...prev,
            { adult: 0, child: 0, infant: 0 },
        ])
    }

    const onRemoveRoom = (index: number) => {
        setSelectedGuests((prev) => prev.filter((_, i) => i !== index))
    }

    const totalGuests = selectedGuests.reduce(
        (sum, room) => sum + room.adult + room.child + room.infant,
        0,
    )

    return (
        <Popover>
            <PopoverTrigger asChild>
                <h6 className="flex max-w-40 cursor-pointer flex-wrap items-center gap-1 text-base leading-4 text-wrap text-zinc-400">
                    <p className="space-x-1">
                        <span>{selectedGuests.length}</span>
                        {selectedGuests.length > 1 ? (
                            <span>rooms</span>
                        ) : (
                            <span>room</span>
                        )}
                    </p>
                    {totalGuests > 0 && (
                        <>
                            &mdash;
                            <p className="space-x-1">
                                <span>{totalGuests}</span>
                                {totalGuests > 1 ? (
                                    <span>guests</span>
                                ) : (
                                    <span>guest</span>
                                )}
                            </p>
                        </>
                    )}
                </h6>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="z-40 pt-6 focus-visible:outline-0!"
            >
                <div className="max-h-96 overflow-y-auto rounded-lg border bg-white p-4 shadow-sm">
                    {selectedGuests.map((room, index) => (
                        <div
                            key={index}
                            className="mb-6 border-b pb-4 last:border-b-0"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <h4 className="text-primary-500 text-xl font-extrabold">
                                    Room {index + 1}
                                </h4>

                                {index > 0 && (
                                    <ButtonIcon
                                        variant="text"
                                        size="extraSmall"
                                        color="danger"
                                        onClick={() => onRemoveRoom(index)}
                                    >
                                        <Trash size={16} />
                                    </ButtonIcon>
                                )}
                            </div>

                            <ul className="flex flex-col gap-2">
                                {guestTypes.map(({ key, label, subtitle }) => (
                                    <GuestCounter
                                        key={key}
                                        label={label}
                                        subtitle={subtitle}
                                        value={room[key]}
                                        onChange={(amount) =>
                                            onUpdateRoom(index, key, amount)
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}

                    <ButtonPrimary
                        size="small"
                        variant="outline"
                        LeftIconElement={<PlusIcon />}
                        className="mt-2 ml-auto"
                        onClick={onAddRoom}
                    >
                        Add Room
                    </ButtonPrimary>
                </div>
            </PopoverContent>
        </Popover>
    )
}
