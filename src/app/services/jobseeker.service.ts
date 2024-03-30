import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IJobseekerAuthResponse, IJobseekerRes, IRes, IResponse } from '../models/jobseeker';
import { Observable } from 'rxjs';

@Injectable()

export class JobseekerService {

  baseURL = environments.baseURL

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<IJobseekerAuthResponse>(`${this.baseURL}/jobseeker/login`, { email, password })
  }

  googleLogin(email: string, firstName: string, image: string) {
    return this.http.post<IJobseekerAuthResponse>(`${this.baseURL}/jobseeker/googleLogin`, { email, firstName, image })
  }

  signup(jobseekerData: IJobseekerRes) {
    return this.http.post<IJobseekerRes>(`${this.baseURL}/jobseeker/signup`, { jobseekerData })
  }

  verifyOTP(otp: number) {
    return this.http.post<IJobseekerAuthResponse>(`${this.baseURL}/jobseeker/verifyOTP`, { otp })
  }

  forgotPassword(email: string) {
    return this.http.post<IRes>(`${this.baseURL}/jobseeker/forgotPassword`, { email })
  }

  resetPassword(newPassword: string, confirmPassword: string) {
    return this.http.post<IRes>(`${this.baseURL}/jobseeker/resetPassword`, { newPassword, confirmPassword })
  }

  resendOTP() {
    return this.http.post<IRes>(`${this.baseURL}/jobseeker/resendOTP`, {})
  }

  getJobseekerDetails(jobseekerId: string): Observable<IJobseekerRes> {
    return this.http.get(`${this.baseURL}/jobseeker/getDetails/${jobseekerId}`)
  }

  changePassword(jobseekerEmail: string, newPassword: string, confirmPassword: string) {
    return this.http.post<IRes>(`${this.baseURL}/jobseeker/changePassword`, { jobseekerEmail, newPassword, confirmPassword })
  }

  changePhoneNumber(jobseekerId: string, phoneNumber: string) {
    return this.http.post<IResponse>(`${this.baseURL}/jobseeker/changePhoneNumber/${jobseekerId}`, { phoneNumber })
  }

  changeLocation(jobseekerId: string, location: string) {
    return this.http.post<IResponse>(`${this.baseURL}/jobseeker/changeLocation/${jobseekerId}`, { location })
  }

  updatePhoto(jobseekerId: string, url: string) {
    return this.http.post<IResponse>(`${this.baseURL}/jobseeker/updatePhoto/${jobseekerId}`,{url})
  }

  addResume(jobseekerId: string, url: string) {
    return this.http.post<IResponse>(`${this.baseURL}/jobseeker/addResume/${jobseekerId}`,{url})
  }

  deleteResume(jobseekerId: string) {
    return this.http.delete<IResponse>(`${this.baseURL}/jobseeker/deleteResume/${jobseekerId}`)
  }

}
