import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IEmployerRes, IRes } from '../models/employer';
import { IJobseekerRes } from '../models/jobseeker';

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

  verifyOTP(otp: number) {
    return this.http.post<IJobseekerRes>(`${this.baseURL}/employer/verifyOTP`,{otp})
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
