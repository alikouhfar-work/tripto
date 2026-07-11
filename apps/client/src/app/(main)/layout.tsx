import {ReactNode} from "react"
import {Header} from "@/components/shared/Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}


export default MainLayout;