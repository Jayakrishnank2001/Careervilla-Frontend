import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { IApiRes } from '../models/common';
import { IIndustryAndCount } from '../models/industry';

@Injectable()

export class IndustryService {

  baseURL = environments.baseURL

  constructor(
    @Inject(HttpClient) private _http: HttpClient) { }

  
  getAllIndustries(page: number, limit: number, searchQuery: string): Observable<IApiRes<IIndustryAndCount | null>>{
    return this._http.get<IApiRes<IIndustryAndCount | null>>(`${this.baseURL}/admin/industries?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }


}
