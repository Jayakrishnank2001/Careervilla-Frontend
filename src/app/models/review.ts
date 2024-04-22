export interface IReview {
    _id?: string
    jobseekerId?: {
        _id: string
        firstName?: string
        lastName?: string
        image?: string
        location?: string
    }
    companyId?: {
        _id: string,
        companyName?: string
        website?: string
        companySize?: string
        industry?: string
        email?: string
        foundedYear?: number
        description?: string
        logo?: string
    }
    rating: number
    createdAt?: string
    comment?: string
}

export interface Review{
    _id?: string,
    jobseekerId?: string,
    companyId?: string,
    rating?: number,
    createdAt?: string,
    comment?: string
}