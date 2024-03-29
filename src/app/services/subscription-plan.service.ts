import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { ISubscriptionRes } from '../models/subscriptionPlan';
import { IRes } from '../models/common';


@Injectable()
  
export class SubscriptionPlanService {

  baseURL=environments.baseURL

  constructor(private readonly http: HttpClient) { }


  getAllPlans(role: 'admin' | 'employer'): Observable<ISubscriptionRes[]>{
    const endpoint = role == 'admin' ? 'admin/subscription-plans' : 'employer/subscription-plans'
    return this.http.get<ISubscriptionRes[]>(`${this.baseURL}/${endpoint}`,{})
  }

  deletePlan(planId: string): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseURL}/admin/delete-plan/${planId}`,{})
  }

  createPlan(data: ISubscriptionRes): Observable<IRes>{
    return this.http.post<IRes>(`${this.baseURL}/admin/create-plan`,{data})
  }

  editPlan(planId: string, data: ISubscriptionRes): Observable<IRes>{
    return this.http.put<IRes>(`${this.baseURL}/admin/update-plan/${planId}`,{data})
  }

  makePayment(stripeToken: any,duration:string,employerId:string) {
    return this.http.post<{data:string}>(`${this.baseURL}/employer/payment/${employerId}`,{stripeToken,duration})
  }



}
