import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IChat } from '../models/chat';
import { IMessage } from '../models/message';
import { IEmployerRes } from '../models/employer';
import { IJobseekerRes } from '../models/jobseeker';

@Injectable()

export class MessageService {

  baseURL = environments.baseURL

  constructor(@Inject(HttpClient) private _http: HttpClient) { }

  getMessages(senderId: string, receiverId: string, role: 'jobseeker' | 'employer') {
    const endpoint = role == 'jobseeker' ? 'jobseeker/messages' : 'employer/messages'
    return this._http.get<IMessage[]>(`${this.baseURL}/${endpoint}?senderId=${senderId}&receiverId=${receiverId}`)
  }

  getAllChats(userId: string, role: 'jobseeker' | 'employer') {
    const endpoint = role == 'jobseeker' ? 'jobseeker/get-chats' : 'employer/get-chats'
    return this._http.get<IChat[]>(`${this.baseURL}/${endpoint}?userId=${userId}&role=${role}`)
  }

  getEmployerAsReceiver(userId: string, role: 'jobseeker') {
    return this._http.get<IEmployerRes>(`${this.baseURL}/jobseeker/get-receiverDetails?userId=${userId}&role=${role}`)
  }

  getJobseekerAsReceiver(userId: string, role: 'employer') {
    return this._http.get<IJobseekerRes>(`${this.baseURL}/employer/get-receiverDetails?userId=${userId}&role=${role}`)
  }




}
