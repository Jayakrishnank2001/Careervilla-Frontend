import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IApiRes, IResponse } from '../models/common';
import { Observable } from 'rxjs';
import { IReportedJobAndCount } from '../models/reportedJob';

@Injectable()
  
export class ReportedJobService {

  baseURL = environments.baseURL

  constructor(private http: HttpClient) { }
  
  reportJob(companyId: string | undefined, jobId: string | undefined, reportedBy: string, reason: string, description: string) {
    return this.http.post<IResponse>(`${this.baseURL}/jobseeker/reportJob`,{companyId,jobId,reportedBy,reason,description})
  }

  getAllReportedJobs(page: number, limit: number, searchQuery: string): Observable<IApiRes<IReportedJobAndCount | null>>{
    return this.http.get<IApiRes<IReportedJobAndCount | null>>(`${this.baseURL}/admin/reportedJobs?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  blockReportedJob(jobId: string,reportJobId:string) {
    return this.http.patch<IResponse>(`${this.baseURL}/admin/block-reportedJob`, { jobId, reportJobId })
  }



}
