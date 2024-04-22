import { Injectable } from '@angular/core';
import {
  type HttpRequest,
  type HttpHandler,
  type HttpEvent,
  type HttpInterceptor,
  type HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private readonly _snackBar:MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error)
        return throwError(error)
      })
    )
  }

  private handleHttpError(error: HttpErrorResponse): void{
    let errorMessage = 'An error occured'
    if (error.error instanceof ErrorEvent) {
      errorMessage=`:${error.error.message}`
    } else {
      errorMessage=`${error.error.message || error.statusText}`
    }
    this._snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      verticalPosition: 'top'
    })
    console.error(errorMessage)
  }
}
