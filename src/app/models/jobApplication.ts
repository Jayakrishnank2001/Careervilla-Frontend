export interface IJobApplication {
    _id?: string,
    jobseekerId?: {
        _id?: string
        firstName?: string
        lastName?: string
        location?: string
        email?: string
        phoneNumber?: string
        image?: string
    }
    jobId?: {
        _id?: string
        jobTitle?: string
    }
    createdAt?: string,
    resume: string,
    status?: string,
    qualification?: string,
    experience?: number
}