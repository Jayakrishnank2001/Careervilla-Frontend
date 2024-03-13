import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Injectable()
  
export class AuthService {

  private readonly TOKEN_KEY = 'jwtToken'
  userRole:string=''
  
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getToken())
  token$: Observable<string | null> = this.tokenSubject.asObservable()

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
    this.tokenSubject.next(token)
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    this.tokenSubject.next(null)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY)
    return !!token
  }

  setUserRole(role: string): void{
    this.userRole=role
  }

  getUserRole(): string{
    return this.userRole
  }
    
  


}
