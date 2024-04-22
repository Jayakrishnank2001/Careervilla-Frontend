import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly _authService: AuthService,private _router:Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const url = this._router.routerState.snapshot.url;
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
    const jwtToken = this._authService.getToken(tokenKey)
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (userRole == 'employer') {
            this._authService.clearToken('employerToken')
            this._router.navigate(['/employer/login'])
          } else if (userRole == 'jobseeker') {
            this._authService.clearToken('jobseekerToken')
            this._router.navigate(['/jobseeker/login'])
          } else if (userRole == 'admin') {
            this._authService.clearToken('adminToken')
            this._router.navigate(['/admin/login'])
          }
        }
        return throwError(error)
      })
    )
  }
}
