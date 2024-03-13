import { Injectable } from '@angular/core';
import { IJobRes } from '../models/job';
import { environments } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
  
export class JobService {

  constructor(private http:HttpClient) { }

  baseURL=environments.baseURL

  saveJob(jobData: IJobRes) {
    return this.http.post(`${this.baseURL}/employer/addJob`,{jobData})
  }
}
