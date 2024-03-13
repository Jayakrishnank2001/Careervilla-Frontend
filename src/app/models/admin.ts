import { IEmployerRes } from "./employer"
import { IJobseekerRes } from "./jobseeker"

export interface IJobseekersAndCount{
    jobseekers: IJobseekerRes[],
    jobseekersCount:number
  }
  
  export interface IEmployersAndCount{
    employers: IEmployerRes[],
    employersCount:number
}

export interface IAdminAuthResponse {
  status: number;
  data: {
    success: boolean;
    message: string;
    adminId?: string;
    token?: string; 
  };
}
  
