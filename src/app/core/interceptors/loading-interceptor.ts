import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

intercept(req: HttpRequest<any>, next: HttpHandler) {
  console.log('Interceptor Running:', req.url);

  this.totalRequests++;
  this.loadingService.show();

  return next.handle(req).pipe(
    finalize(() => {
      this.totalRequests--;

      if (this.totalRequests === 0) {
        this.loadingService.hide();
      }
    })
  );
}
}