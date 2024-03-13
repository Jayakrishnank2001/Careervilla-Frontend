import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IEmployerAuthResponse, IEmployerRes, IRes } from '../models/employer';

@Injectable()
  
export class EmployerService {

  baseURL=environments.baseURL
  constructor(private readonly http: HttpClient) { }
  
  login(email: string, password: string) {
    return this.http.post<IEmployerAuthResponse>(`${this.baseURL}/employer/login`,{email,password})
  }

  signup(employerData: IEmployerRes) {
    return this.http.post<IEmployerRes>(`${this.baseURL}/employer/signup`,{employerData})
  }

  verifyOTP(otp: number) {
    return this.http.post<IEmployerAuthResponse>(`${this.baseURL}/employer/verifyOTP`,{otp})
  }

  forgotPassword(email: string) {
    return this.http.post<IRes>(`${this.baseURL}/employer/forgotPassword`,{email})
  }

  resetPassword(newPassword: string, confirmPassword: string) {
    return this.http.post<IRes>(`${this.baseURL}/employer/resetPassword`,{newPassword,confirmPassword})
  }

  resendOTP() {
    return this.http.post<IRes>(`${this.baseURL}/employer/resendOTP`,{})
  }

}
