export interface IJobRes {
    _id?: string,
    companyId?: {
        _id?: string,
        companyName?: string,
        website?: string,
        email?: string,
        companySize?: string,
        industry?: string,
        foundedYear?: number,
        description?: string
        logo?:string
    }
    jobTitle?: string,
    jobDescription?: string,
    email?: string,
    salary?: string,
    specialisms?: string,
    jobType?: string,
    experience?: string,
    gender?: string,
    applicationDeadline?: string,
    status?: string,
    postedBy?: {
        _id: string
        firstName?: string
        lastName?: string
        image?:string
    }
    addressId?: {
        _id?:string
        address?: string,
        city?: string
        state?: string,
        country?: string
    };
    industry?:string
}

export interface JobSearchQuery {
    jobTitle?: string;
    location?: string;
    experience?: string;
    industryName?: string
    jobType?:string
  }