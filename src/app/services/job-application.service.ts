import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IJobApplication } from '../models/jobApplication';
import { IResponse } from '../models/common';

@Injectable()

export class JobApplicationService {

  baseURL = environments.baseURL

  constructor(private http: HttpClient) { }

  applyJob(applicationData: IJobApplication) {
    return this.http.post<IResponse>(`${this.baseURL}/jobseeker/apply-job`, applicationData)
  }

  getJobApplications(jobId: string, status?: string) {
    return this.http.get<IJobApplication[]>(`${this.baseURL}/employer/job-applications/${jobId}?status=${status}`)
  }

  rejectAndApproveApplication(applicationId: string, status: string) {
    return this.http.patch<IResponse>(`${this.baseURL}/employer/change-applicationStatus`, { applicationId, status })
  }


}
