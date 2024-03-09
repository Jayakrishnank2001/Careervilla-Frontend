import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IApiRes, IRes } from '../models/common';
import { IEmployersAndCount, IJobseekersAndCount } from '../models/admin';
import { ISubscriptionRes } from '../models/subscriptionPlan';

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

  getAllPlans(): Observable<ISubscriptionRes[]>{
    return this.http.get<ISubscriptionRes[]>(`${this.baseURL}/admin/subscription-plans`,{})
  }

  deletePlan(planId: string): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseURL}/admin/delete-plan/${planId}`,{})
  }

  createPlan(data: ISubscriptionRes): Observable<IRes>{
    return this.http.post<IRes>(`${this.baseURL}/admin/create-plan`,{data})
  }

  editPlan(planId: string, data: ISubscriptionRes): Observable<IRes>{
    return this.http.put<IRes>(`${this.baseURL}/admin/update-plan/${planId}`,{data})
  }



}