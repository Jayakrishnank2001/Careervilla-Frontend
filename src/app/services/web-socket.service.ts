import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { IResponse } from '../models/jobseeker';
import { IMessage } from '../models/message';
import { IChat } from '../models/chat';

@Injectable()

export class WebSocketService {

  baseURL = environments.baseURL

  constructor(private _http: HttpClient) { }

  sendMessage(senderId: string, receiverId: string, message: string, role: 'jobseeker' | 'employer') {
    const endpoint = role == 'jobseeker' ? 'jobseeker/send-message' : 'employer/send-message'
    return this._http.post<IResponse>(`${this.baseURL}/${endpoint}`, { senderId, receiverId, message })
  }

  getMessages(senderId: string, receiverId: string, role: 'jobseeker' | 'employer') {
    const endpoint = role == 'jobseeker' ? 'jobseeker/messages' : 'employer/messages'
    return this._http.get<IMessage[]>(`${this.baseURL}/${endpoint}?senderId=${senderId}&receiverId=${receiverId}`)
  }

  getAllChats(userId: string, role: 'jobseeker' | 'employer') {
    const endpoint = role == 'jobseeker' ? 'jobseeker/get-chats' : 'employer/get-chats'
    return this._http.get<IChat[]>(`${this.baseURL}/${endpoint}?userId=${userId}&role=${role}`)
  }



}
