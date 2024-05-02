import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IJobApplication } from '../models/jobApplication';
import { IResponse } from '../models/common';

@Injectable()

export class JobApplicationService {

  baseURL = environments.baseURL

  constructor(private _http: HttpClient) { }

  applyJob(applicationData: IJobApplication) {
    return this._http.post<IResponse>(`${this.baseURL}/jobseeker/apply-job`, applicationData)
  }

  getJobApplications(jobId: string, status?: string) {
    return this._http.get<IJobApplication[]>(`${this.baseURL}/employer/job-applications/${jobId}?status=${status}`)
  }

  rejectAndApproveApplication(applicationId: string, status: string) {
    return this._http.patch<IResponse>(`${this.baseURL}/employer/change-applicationStatus`, { applicationId, status })
  }

  getJobseekerApplications(jobseekerId: string) {
    return this._http.get<IJobApplication[]>(`${this.baseURL}/jobseeker/get-appliedJobs/${jobseekerId}`)
  }

  addRejectionReason(applicationId: string, reason: string) {
    return this._http.patch<IResponse>(`${this.baseURL}/employer/add-rejectionReason`, { applicationId,reason })
  }


}
