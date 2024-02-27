export interface IJobseekerRes {
    id?: string,
    firstName?: string,
    lastName?: string,
    password?: string,
    email?: string,
    phoneNumber?: string,
    isBlocked?: boolean,
    gender?: string,
    role?: string,
    image?: string,
    resume?: string,
    location?: string
}

export interface IRes{
    success?: boolean,
    message?:string
}
