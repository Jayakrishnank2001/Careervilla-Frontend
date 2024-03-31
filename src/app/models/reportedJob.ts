export interface IReportedJob{
    _id?: string,
    jobId?: string,
    companyId?: string,
    reportedAt?: string,
    status?: string,
    reportedBy?: string,
    reason?: string,
    description?:string
}

export interface IReportedJobAndCount{
    reportedJobs: IReportedJob[],
    reportedJobsCount:number
  }