import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IReview, Review } from '../models/review';
import { IResponse } from '../models/common';

@Injectable()
  
export class ReviewService {

  baseURL = environments.baseURL

  constructor(private _http: HttpClient) { }
  
  postReview(reviewData:Review) {
    return this._http.post<IResponse>(`${this.baseURL}/jobseeker/post-review`,reviewData)
  }

  getAllReviews(jobseekerId?: string, companyId?: string) {
    return this._http.get<IReview[]>(`${this.baseURL}/jobseeker/get-reviews?jobseekerId=${jobseekerId}&companyId=${companyId}`)
  }

  deleteReview(reviewId: string) {
    return this._http.delete<IResponse>(`${this.baseURL}/jobseeker/delete-review/${reviewId}`)
  }

}
