import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { INotification } from '../models/notification';

@Injectable()
  
export class NotificationService {

  baseURL=environments.baseURL

  constructor(private _http: HttpClient) { }
  
  getEmployerNotifications(userId: string) {
    return this._http.get<INotification>(`${this.baseURL}/employer/notifications/${userId}`)
  }


  
}
