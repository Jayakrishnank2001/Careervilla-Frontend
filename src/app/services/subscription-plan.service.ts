import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { IPlansAndCount, ISubscriptionRes } from '../models/subscriptionPlan';
import { IApiRes, IRes } from '../models/common';


@Injectable()

export class SubscriptionPlanService {

  baseURL = environments.baseURL

  constructor(private readonly _http: HttpClient) { }


  getAllPlans(role: 'admin' | 'employer', page?: number, limit?: number, searchQuery?: string): Observable<IApiRes<IPlansAndCount | null>> {
    const endpoint = role == 'admin' ? 'admin/subscription-plans' : 'employer/subscription-plans'
    return this._http.get<IApiRes<IPlansAndCount | null>>(`${this.baseURL}/${endpoint}?page=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  deletePlan(planId: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this.baseURL}/admin/delete-plan/${planId}`)
  }

  createPlan(data: ISubscriptionRes): Observable<IRes> {
    return this._http.post<IRes>(`${this.baseURL}/admin/create-plan`, { data })
  }

  editPlan(planId: string, data: ISubscriptionRes): Observable<IRes> {
    return this._http.put<IRes>(`${this.baseURL}/admin/update-plan/${planId}`, { data })
  }

  makePayment(stripeToken: any, duration: string, employerId: string, planId: string) {
    return this._http.post<{ data: string }>(`${this.baseURL}/employer/payment/${employerId}`, { stripeToken, duration, planId })
  }



}
