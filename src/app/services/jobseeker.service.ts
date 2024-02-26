import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IJobseekerRes } from '../models/jobseeker';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {

  baseURL=environments.baseURL

  constructor(private readonly http: HttpClient) { }
  
  login(email: string, password: string) {
    return this.http.post<IJobseekerRes>(`${this.baseURL}/jobseeker/login`,{email,password})
  }
}
