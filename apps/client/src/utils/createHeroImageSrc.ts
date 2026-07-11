export const createHeroImageSrc = (id: string) => {
    return `${process.env.NEXT_PUBLIC_DESTINATION_STORAGE_URL}/${id}/images/hero.webp`
}