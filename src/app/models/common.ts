import { IEmployersAndCount, IJobseekersAndCount } from "./admin"
import { IEmployerRes } from "./employer"
import { IJobseekerRes } from "./jobseeker"

export type AllResTypes = IJobseekerRes | IJobseekerRes[] | IEmployerRes | IEmployerRes[] | IJobseekersAndCount | IEmployersAndCount | null

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