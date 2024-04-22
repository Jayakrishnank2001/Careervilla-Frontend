import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { ICompany } from '../models/company';
import { IRes } from '../models/common';

@Injectable()

export class CompanyService {

  baseURL = environments.baseURL

  constructor(private _http: HttpClient) { }

  getCompanyDetails(companyId: string) {
    return this._http.get<ICompany>(`${this.baseURL}/employer/companyDetails/${companyId}`,{})
  }

  updateCompanyLogo(companyId: string, url: string) {
    return this._http.post<IRes>(`${this.baseURL}/employer/update-companyLogo`,{companyId,url})
  }

  saveCompany(companyData:ICompany,employerId:string) {
    return this._http.post<IRes>(`${this.baseURL}/employer/addCompany/${employerId}`,companyData)
  }

  editCompany(companyData: ICompany, companyId: string, addressId: string) {
    return this._http.put<IRes>(`${this.baseURL}/employer/updateCompany`,{companyData,companyId,addressId})
  }

  getAllCompanies() {
    return this._http.get<ICompany[]>(`${this.baseURL}/jobseeker/companies`)
  }





}
