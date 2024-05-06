import { IEmployersAndCount, IJobseekersAndCount } from "./admin"
import { IEmployerRes } from "./employer"
import { IIndustry, IIndustryAndCount } from "./industry"
import { IJobseekerRes } from "./jobseeker"
import { IReportedJobAndCount } from "./reportedJob"
import { IPlansAndCount, ISubscriptionRes } from "./subscriptionPlan"

export type AllResTypes = IJobseekerRes | IJobseekerRes[] | IEmployerRes | IEmployerRes[] | IJobseekersAndCount | IEmployersAndCount | null | IReportedJobAndCount |
    IIndustry | IIndustry[] | IIndustryAndCount | ISubscriptionRes | ISubscriptionRes[] | IPlansAndCount

export interface IApiRes<T extends AllResTypes> {
    status: number,
    message: string,
    data: T
}

export interface IRes{
    status: number,
    data: {
        success: boolean,
        message:string
    }
}

export interface IToken{
    id: string,
    username: string,
    role:string
}

export interface IResponse{
    success: boolean
    message:string
}

export interface DecodedToken {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}
