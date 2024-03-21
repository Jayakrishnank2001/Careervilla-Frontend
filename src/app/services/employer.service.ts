import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IEmployerAuthResponse, IEmployerRes, IRes } from '../models/employer';
import { Observable } from 'rxjs';

@Injectable()
  
export class EmployerService {

  baseURL=environments.baseURL
  constructor(private readonly http: HttpClient) { }
  
  login(email: string, password: string) {
    return this.http.post<IEmployerAuthResponse>(`${this.baseURL}/employer/login`,{email,password})
  }

  googleLogin(email: string, firstName: string, image: string) {
    return this.http.post<IEmployerAuthResponse>(`${this.baseURL}/employer/googleLogin`,{email,firstName,image})
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

  getEmployerDetails(employerId: String): Observable<IEmployerRes>{
    return this.http.get<IEmployerRes>(`${this.baseURL}/employer/getDetails/${employerId}`)
  }

}
