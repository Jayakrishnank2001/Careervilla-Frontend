import { Injectable } from '@angular/core';
import {
  type HttpRequest,
  type HttpHandler,
  type HttpEvent,
  type HttpInterceptor,
  type HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError, type Observable } from 'rxjs';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { environments } from 'src/environments/environment';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private readonly _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
  }
}
