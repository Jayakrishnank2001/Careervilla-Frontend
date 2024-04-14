export interface IJobApplication{
    _id?: string,
    jobseekerId?: {
        _id?: string
        firstName?: string
        lastName?: string
        location?: string
        email?: string
        phoneNumber?: string
        image?:string
    }
    jobId?: string,
    createdAt?: string,
    resume: string,
    status?: string,
    qualification?: string,
    experience?:number
}