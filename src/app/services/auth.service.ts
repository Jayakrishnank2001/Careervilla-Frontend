import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Injectable({
  providedIn:'root'
})
  
export class AuthService {

  private readonly TOKEN_KEY = 'jwtToken';
  
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getToken(this.TOKEN_KEY))
  token$: Observable<string | null> = this.tokenSubject.asObservable()

  constructor() {}

  getToken(tokenKey:string): string | null {
    return localStorage.getItem(tokenKey)
  }

  setToken(tokenKey:string,token: string): void {
    localStorage.setItem(tokenKey, token)
    this.tokenSubject.next(token)
  }

  clearToken(tokenKey:string): void {
    localStorage.removeItem(tokenKey)
    this.tokenSubject.next(null)
  }

  isAuthenticated(tokenKey:string): boolean {
    const token = localStorage.getItem(tokenKey)
    return !!token
  }
    
  
  
}
