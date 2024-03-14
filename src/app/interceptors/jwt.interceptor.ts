import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService,private router:Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const url = this.router.routerState.snapshot.url;
    const segments = url.split('/');
    const userRole = segments[segments.length - 2];
    let tokenKey
    if (userRole == 'admin') {
      tokenKey = 'adminToken'
    } else if (userRole == 'employer') {
      tokenKey = 'employerToken'
    } else if (userRole == 'jobseeker') {
      tokenKey = 'jobseekerToken'
    } else {
      tokenKey = ''
    }
    const jwtToken = this.authService.getToken(tokenKey)
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
    }

    return next.handle(request);
  }
}
