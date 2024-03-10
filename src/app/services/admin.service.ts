import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IApiRes, IRes } from '../models/common';
import { IEmployersAndCount, IJobseekersAndCount } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL=environments.baseURL

  constructor(private readonly http: HttpClient) { }
  
  adminLogin(username: string, password: string): any{
    return this.http.post<any>(`${this.baseURL}/admin/login`,{username,password})
  }

  getAllJobseekers(page: number, limit: number, searchQuery: string): Observable<IApiRes<IJobseekersAndCount | null>>{
    return this.http.get<IApiRes<IJobseekersAndCount | null>>(`${this.baseURL}/admin/jobseekers?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  blockJobseeker(jobseekerId: string) {
    return this.http.patch<any>(`${this.baseURL}/admin/jobseekers/block/${jobseekerId}`,{})
  }

  getAllEmployers(page: number, limit: number, searchQuery: string): Observable<IApiRes<IEmployersAndCount | null>>{
    return this.http.get<IApiRes<IEmployersAndCount|null>>(`${this.baseURL}/admin/employers?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  blockEmployer(employerId: string) {
    return this.http.patch<any>(`${this.baseURL}/admin/employers/block/${employerId}`,{})
  }



}