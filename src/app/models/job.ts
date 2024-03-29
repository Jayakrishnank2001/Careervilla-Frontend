export interface IJobRes{
    id?: string,
    companyId?: {
        companyName?: string,
        website?: string,
        email?: string,
        companySize?: string,
        industry?: string,
        foundedYear?: number,
        description?:string
    }
    jobTitle?: string,
    jobDescription?: string,
    email?:string,
    salary?: string,
    specialisms?:string,
    jobType?: string,
    experience?: string,
    gender?: string,
    applicationDeadline?: string,
    addressId?: {
        address?:string,
        city?: string
        state?: string,
        country?:string
    };
}