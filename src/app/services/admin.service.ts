import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IApiRes, IResponse, } from '../models/common';
import { IAdminAuthResponse, IEmployersAndCount, IJobseekersAndCount } from '../models/admin';

@Injectable()
  
export class AdminService {
  baseURL=environments.baseURL

  constructor(private readonly _http: HttpClient) { }
  
  adminLogin(username: string, password: string){
    return this._http.post<IAdminAuthResponse>(`${this.baseURL}/admin/login`,{username,password})
  }

  getAllJobseekers(page: number, limit: number, searchQuery: string): Observable<IApiRes<IJobseekersAndCount | null>>{
    return this._http.get<IApiRes<IJobseekersAndCount | null>>(`${this.baseURL}/admin/jobseekers?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  blockJobseeker(jobseekerId: string) {
    return this._http.patch<IResponse>(`${this.baseURL}/admin/jobseekers/block/${jobseekerId}`,{})
  }

  getAllEmployers(page: number, limit: number, searchQuery: string): Observable<IApiRes<IEmployersAndCount | null>>{
    return this._http.get<IApiRes<IEmployersAndCount|null>>(`${this.baseURL}/admin/employers?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  blockEmployer(employerId: string) {
    return this._http.patch<IResponse>(`${this.baseURL}/admin/employers/block/${employerId}`,{})
  }



}