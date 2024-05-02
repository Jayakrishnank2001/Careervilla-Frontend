import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { IApiRes, IRes } from '../models/common';
import { IIndustry, IIndustryAndCount } from '../models/industry';

@Injectable()

export class IndustryService {

  baseURL = environments.baseURL

  constructor(
    @Inject(HttpClient) private _http: HttpClient) { }


  getAllIndustries(role: 'admin' | 'employer' | 'jobseeker', page?: number, limit?: number, searchQuery?: string): Observable<IApiRes<IIndustryAndCount | null>> {
    const endpoint = role == 'admin' ? 'admin/industries' : role == 'employer' ? 'employer/industries' : 'jobseeker/industries'
    return this._http.get<IApiRes<IIndustryAndCount | null>>(`${this.baseURL}/${endpoint}?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  deleteIndustry(industryId: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this.baseURL}/admin/delete-industry/${industryId}`)
  }

  addIndustry(data: IIndustry): Observable<IRes> {
    return this._http.post<IRes>(`${this.baseURL}/admin/add-industry`, data)
  }

  editIndustry(industryId: string, data: IIndustry): Observable<IRes> {
    return this._http.put<IRes>(`${this.baseURL}/admin/update-industry/${industryId}`, data)
  }



}
