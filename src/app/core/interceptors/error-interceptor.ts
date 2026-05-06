import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // 🔴 Unauthorized → force logout
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }

        // 🔴 Optional: log or toast system here
        console.error('API Error:', error);

        return throwError(() => error);
      })
    );
  }
}