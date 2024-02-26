import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IEmployerRes } from '../models/employer';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  baseURL=environments.baseURL
  constructor(private readonly http: HttpClient) { }
  
  login(email: string, password: string) {
    return this.http.post<IEmployerRes>(`${this.baseURL}/employer/login`,{email,password})
  }

  signup(employerData: any) {
    return this.http.post<IEmployerRes>(`${this.baseURL}/employer/signup`,{employerData})
  }
}
