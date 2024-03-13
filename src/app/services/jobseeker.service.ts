import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IJobseekerAuthResponse, IJobseekerRes, IRes } from '../models/jobseeker';
import { IResponse } from '../models/common';

@Injectable()
  
export class JobseekerService {

  baseURL=environments.baseURL

  constructor(private readonly http: HttpClient) { }
  
  login(email: string, password: string) {
    return this.http.post<IJobseekerAuthResponse>(`${this.baseURL}/jobseeker/login`,{email,password})
  }

  signup(jobseekerData: IJobseekerRes) {
    return this.http.post<IJobseekerRes>(`${this.baseURL}/jobseeker/signup`,{jobseekerData})
  }

  verifyOTP(otp: number) {
    return this.http.post<IJobseekerAuthResponse>(`${this.baseURL}/jobseeker/verifyOTP`,{otp})
  }

  forgotPassword(email: string) {
    return this.http.post<IRes>(`${this.baseURL}/jobseeker/forgotPassword`,{email})
  }

  resetPassword(newPassword: string, confirmPassword: string) {
    return this.http.post<IRes>(`${this.baseURL}/jobseeker/resetPassword`,{newPassword,confirmPassword})
  }

  resendOTP() {
    return this.http.post<IRes>(`${this.baseURL}/jobseeker/resendOTP`,{})
  }
}
