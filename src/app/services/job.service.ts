import { Injectable } from '@angular/core';
import { IJobRes } from '../models/job';
import { environments } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRes } from '../models/common';

@Injectable()
  
export class JobService {

  constructor(private http:HttpClient) { }

  baseURL=environments.baseURL

  saveJob(jobData: IJobRes) {
    return this.http.post<IRes>(`${this.baseURL}/employer/addJob`,jobData)
  }

  getJobs() {
    return this.http.get<IJobRes[]>(`${this.baseURL}/jobseeker/jobs`)
  }

  


}
