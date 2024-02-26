import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL=environments.baseURL

  constructor(private readonly http: HttpClient) { }
  
  adminLogin(username: string, password: string): any{
    return this.http.post<any>(`${this.baseURL}/admin/login`,{username,password})
  }
}