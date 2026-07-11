import { LogInIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary"

export const Header: FC = () => {
    return (
        <header className="w-full flex justify-center bg-white/30 backdrop-blur-xl">
            <div className="flex h-24 w-full max-w-7xl items-center justify-between p-4 2xl:px-0">
                <Link href='/public'>
                    <Image
                        height={48}
                        width={128}
                        loading="eager"
                        src="/logo.svg"
                        alt="Tripto Logo"
                    />
                </Link>
                <ul className="flex items-center gap-2">
                    <p>Language</p>
                    <p>AI Assistant</p>
                    <ButtonPrimary
                        size="medium"
                        LeftIconElement={<LogInIcon />}
                    >
                        Login
                    </ButtonPrimary>
                </ul>
            </div>
        </header>
    )
}
