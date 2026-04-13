import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  private lastErrorTime = 0;
  private readonly ERROR_COOLDOWN = 60000; // 60 seconds
  private readonly SLOW_API_THRESHOLD = 2000; // 2 seconds

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();

    const modifiedReq = req.clone({
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest',
        device: 'web',
        sourceApplication: 'dashboard',
      },
    });

    return next.handle(modifiedReq).pipe(
      tap(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed > this.SLOW_API_THRESHOLD) {
          console.warn(`Slow API: ${req.url} took ${elapsed}ms`);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized — redirecting to login');
          // TODO: trigger logout action via NgRx store
        }

        if ([500, 502, 503, 504].includes(error.status)) {
          const now = Date.now();
          if (now - this.lastErrorTime > this.ERROR_COOLDOWN) {
            this.lastErrorTime = now;
            console.error(`Server error ${error.status}: ${error.message}`);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
