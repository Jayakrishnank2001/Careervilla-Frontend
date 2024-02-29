import { IEmployersAndCount, IJobseekersAndCount } from "./admin"
import { IEmployerRes } from "./employer"
import { IJobseekerRes } from "./jobseeker"

export type AllResTypes = IJobseekerRes | IJobseekerRes[] | IEmployerRes | IEmployerRes[] | IJobseekersAndCount | IEmployersAndCount | null

export interface IApiRes<T extends AllResTypes> {
    status: number,
    message: string,
    data: T
}