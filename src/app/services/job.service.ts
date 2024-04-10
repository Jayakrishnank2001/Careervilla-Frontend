import { Injectable } from '@angular/core';
import { IJobRes } from '../models/job';
import { environments } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRes } from '../models/common';

@Injectable()
  
export class JobService {

  constructor(private http:HttpClient) { }

  baseURL=environments.baseURL

  saveJob(jobData: IJobRes,employerId:string) {
    return this.http.post<IRes>(`${this.baseURL}/employer/addJob/${employerId}`,jobData)
  }

  getJobs() {
    return this.http.get<IJobRes[]>(`${this.baseURL}/jobseeker/jobs`)
  }

  getJobDetails(jobId: string) {
    return this.http.get<IJobRes>(`${this.baseURL}/employer/get-jobDetails/${jobId}`)
  }

  updateJob(jobData: IJobRes, jobId: string, addressId:string) {
    return this.http.put<IRes>(`${this.baseURL}/employer/updateJob`,{jobData,jobId,addressId})
  }

  updateJobStatus(jobId: string) {
    return this.http.patch<IRes>(`${this.baseURL}/employer/update-jobStatus/${jobId}`,{})
  }

  


}
