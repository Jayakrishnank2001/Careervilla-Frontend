export interface IReportedJob {
    _id?: string,
    jobId?: {
        id?: string,
        jobTitle?: string
    },
    companyId?: {
        id?: string,
        companyName?: string,
        website?: string,
        industry?: string,
        email?: string,
    },
    reportedAt?: string,
    status?: string,
    reportedBy?: string,
    reason?: string,
    description?: string
}

export interface IReportedJobAndCount {
    reportedJobs: IReportedJob[],
    reportedJobsCount: number
}