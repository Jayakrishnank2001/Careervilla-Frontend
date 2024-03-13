export interface IJobRes{
    id?: string,
    companyName:string,
    jobDescription?: string,
    email?: string,
    jobType?: string,
    salary?: string,
    specialisms?: string,
    experience?: string,
    gender?: string,
    industry?: string,
    applicationDeadline?: string,
    address: {
        id:string,
        address?: string,
        state?: string,
        city?: string,
        country?:string
    }
}
