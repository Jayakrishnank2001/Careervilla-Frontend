export interface IIndustry{
    _id?: string
    industryName?: string
    description?:string
    dateAdded?: string
    status?: string
}

export interface IIndustryAndCount {
    industries: IIndustry[],
    industriesCount: number
}