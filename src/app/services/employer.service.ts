import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IEmployerAuthResponse, IEmployerRes, IRes, IResponse } from '../models/employer';
import { Observable } from 'rxjs';
import { IJobRes } from '../models/job';

@Injectable()

export class EmployerService {

  baseURL = environments.baseURL
  constructor(private readonly _http: HttpClient) { }

  login(email: string, password: string) {
    return this._http.post<IEmployerAuthResponse>(`${this.baseURL}/employer/login`, { email, password })
  }

  googleLogin(email: string, firstName: string, image: string) {
    return this._http.post<IEmployerAuthResponse>(`${this.baseURL}/employer/googleLogin`, { email, firstName, image })
  }

  signup(employerData: IEmployerRes) {
    return this._http.post<IEmployerRes>(`${this.baseURL}/employer/signup`, { employerData })
  }

  verifyOTP(otp: number) {
    return this._http.post<IEmployerAuthResponse>(`${this.baseURL}/employer/verifyOTP`, { otp })
  }

  forgotPassword(email: string) {
    return this._http.post<IRes>(`${this.baseURL}/employer/forgotPassword`, { email })
  }

  resetPassword(newPassword: string, confirmPassword: string) {
    return this._http.post<IRes>(`${this.baseURL}/employer/resetPassword`, { newPassword, confirmPassword })
  }

  resendOTP() {
    return this._http.post<IRes>(`${this.baseURL}/employer/resendOTP`, {})
  }

  getEmployerDetails(employerId: string): Observable<IEmployerRes> {
    return this._http.get<IEmployerRes>(`${this.baseURL}/employer/getDetails/${employerId}`)
  }

  changePassword(employerEmail: string, newPassword: string, confirmPassword: string) {
    return this._http.put<IRes>(`${this.baseURL}/employer/changePassword`, { employerEmail, newPassword, confirmPassword })
  }

  changePhoneNumber(employerId: string, phoneNumber: string) {
    return this._http.put<IResponse>(`${this.baseURL}/employer/changePhoneNumber/${employerId}`, { phoneNumber })
  }

  changeLocation(employerId: string, location: string) {
    return this._http.put<IResponse>(`${this.baseURL}/employer/changeLocation/${employerId}`, { location })
  }

  updatePhoto(employerId: string, url: string) {
    return this._http.put<IResponse>(`${this.baseURL}/employer/updatePhoto/${employerId}`,{url})
  }

  getPostedJobs(employerId: string) {
    return this._http.get<IJobRes[]>(`${this.baseURL}/employer/postedJobs/${employerId}`)
  }

  

}
