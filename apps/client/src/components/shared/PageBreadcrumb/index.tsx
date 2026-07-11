import { FC, Fragment } from "react"
import { PageBreadcrumbProps } from "./types/pageBreadcrumb"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const PageBreadcrumb: FC<PageBreadcrumbProps> = (props) => {
    const {
        pages,
        className = '',
        currentPageTitle,
        hasHomePage = true,
    } = props

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {hasHomePage && (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/public'>Tripto</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                )}
                {pages?.map(page => (
                    <Fragment key={page.title}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={page.route}>{page.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </Fragment>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}