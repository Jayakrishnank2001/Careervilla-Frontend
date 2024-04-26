import { Injectable } from '@angular/core';
import { IJobRes } from '../models/job';
import { environments } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRes } from '../models/common';

@Injectable()

export class JobService {

  constructor(private _http: HttpClient) { }

  baseURL = environments.baseURL

  saveJob(jobData: IJobRes, employerId: string) {
    return this._http.post<IRes>(`${this.baseURL}/employer/addJob/${employerId}`, jobData)
  }

  getJobs(page: number, pageSize: number, companyId?: string) {
    return this._http.get<IJobRes[]>(`${this.baseURL}/jobseeker/jobs?companyId=${companyId}&page=${page}&pageSize=${pageSize}`)
  }

  getJobDetails(jobId: string) {
    return this._http.get<IJobRes>(`${this.baseURL}/employer/get-jobDetails/${jobId}`)
  }

  updateJob(jobData: IJobRes, jobId: string, addressId: string) {
    return this._http.put<IRes>(`${this.baseURL}/employer/updateJob`, { jobData, jobId, addressId })
  }

  updateJobStatus(jobId: string) {
    return this._http.patch<IRes>(`${this.baseURL}/employer/update-jobStatus/${jobId}`, {})
  }




}
