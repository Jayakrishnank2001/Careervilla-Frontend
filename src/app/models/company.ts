export interface ICompany {
    _id?: string,
    companyName?: string,
    website?: string,
    companySize?: string,
    industry?: string,
    email?: string,
    foundedYear?: number,
    description?: string,
    logo?: string,
    addressId?: {
        _id:string
        address?:string,
        city?: string
        state?: string,
        country?:string
    }
}