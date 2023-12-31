export interface Movie {
    _id: string,
    title: string,
    description?: string,
    genderId?: string,
    release_date: string,
    image?: string,
    createdAt: string,
    updatedAt: string
}