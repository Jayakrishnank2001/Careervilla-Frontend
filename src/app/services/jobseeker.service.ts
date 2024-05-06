import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IJobseekerAuthResponse, IJobseekerRes, IRes, IResponse } from '../models/jobseeker';
import { Observable } from 'rxjs';
import { IJobRes } from '../models/job';

@Injectable()

export class JobseekerService {

  baseURL = environments.baseURL

  constructor(private readonly _http: HttpClient) { }

  login(email: string, password: string) {
    return this._http.post<IJobseekerAuthResponse>(`${this.baseURL}/jobseeker/login`, { email, password })
  }

  googleLogin(email: string, firstName: string, image: string) {
    return this._http.post<IJobseekerAuthResponse>(`${this.baseURL}/jobseeker/googleLogin`, { email, firstName, image })
  }

  signup(jobseekerData: IJobseekerRes) {
    return this._http.post<IJobseekerRes>(`${this.baseURL}/jobseeker/signup`, { jobseekerData })
  }

  verifyOTP(otp: number) {
    return this._http.post<IJobseekerAuthResponse>(`${this.baseURL}/jobseeker/verifyOTP`, { otp })
  }

  forgotPassword(email: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/forgotPassword`, { email })
  }

  resetPassword(newPassword: string, confirmPassword: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/resetPassword`, { newPassword, confirmPassword })
  }

  resendOTP() {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/resendOTP`, {})
  }

  getJobseekerDetails(jobseekerId: string): Observable<IJobseekerRes> {
    return this._http.get(`${this.baseURL}/jobseeker/getDetails/${jobseekerId}`)
  }

  changePassword(jobseekerEmail: string, newPassword: string, confirmPassword: string) {
    return this._http.put<IRes>(`${this.baseURL}/jobseeker/changePassword`, { jobseekerEmail, newPassword, confirmPassword })
  }

  changePhoneNumber(jobseekerId: string, phoneNumber: string) {
    return this._http.put<IResponse>(`${this.baseURL}/jobseeker/changePhoneNumber/${jobseekerId}`, { phoneNumber })
  }

  changeLocation(jobseekerId: string, location: string) {
    return this._http.put<IResponse>(`${this.baseURL}/jobseeker/changeLocation/${jobseekerId}`, { location })
  }

  updatePhoto(jobseekerId: string, url: string) {
    return this._http.put<IResponse>(`${this.baseURL}/jobseeker/updatePhoto/${jobseekerId}`, { url })
  }

  addResume(jobseekerId: string, url: string) {
    return this._http.post<IResponse>(`${this.baseURL}/jobseeker/addResume/${jobseekerId}`, { url })
  }

  deleteResume(jobseekerId: string) {
    return this._http.delete<IResponse>(`${this.baseURL}/jobseeker/deleteResume/${jobseekerId}`)
  }

  saveJob(jobseekerId: string, jobId: String) {
    return this._http.post<IResponse>(`${this.baseURL}/jobseeker/saveJob`, { jobseekerId, jobId })
  }

  unsaveJob(jobseekerId: string, jobId: string) {
    return this._http.post<IResponse>(`${this.baseURL}/jobseeker/unsaveJob`, { jobseekerId, jobId })
  }

  getSavedJobs(jobseekerId: string) {
    return this._http.get<IJobRes[]>(`${this.baseURL}/jobseeker/savedJobs/${jobseekerId}`)
  }

  withdrawApplication(jobId: string, jobseekerId: string) {
    return this._http.patch<IResponse>(`${this.baseURL}/jobseeker/withdraw-application`, { jobId, jobseekerId })
  }

  addRecentWork(work: string, jobseekerId: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/add-recent-work`, { work, jobseekerId })
  }

  addHighestEducation(education: string, jobseekerId: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/add-education`, { education, jobseekerId })
  }

  addMinimumSalary(salary: string, jobseekerId: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/add-salary`, { salary, jobseekerId })
  }

  addJobTypes(jobTypes: [string], jobseekerId: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/add-jobTypes`, { jobTypes, jobseekerId })
  }

  addSkills(skills: string[], jobseekerId: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/add-skills`, { skills, jobseekerId })
  }

  addLanguages(languages: string[], jobseekerId: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/add-languages`, { languages, jobseekerId })
  }

  addJobTitles(jobTitles: string[], jobseekerId: string) {
    return this._http.post<IRes>(`${this.baseURL}/jobseeker/add-jobTitles`, { jobTitles, jobseekerId })
  }



}
