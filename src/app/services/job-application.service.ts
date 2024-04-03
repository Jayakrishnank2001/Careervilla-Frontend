import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IJobApplication } from '../models/jobApplication';
import { IResponse } from '../models/common';

@Injectable()
  
export class JobApplicationService {

  baseURL = environments.baseURL

  constructor(private http: HttpClient) { }
  
  applyJob(applicationData:IJobApplication) {
    return this.http.post<IResponse>(`${this.baseURL}/jobseeker/apply-job`,applicationData)
  }



}
