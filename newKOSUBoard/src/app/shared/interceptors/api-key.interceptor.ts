import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';

let refreshInProgress = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const jwtInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  const userAut = inject(AuthService);
  const router = inject(Router);

  // refresh poziv
  if (request.url.includes('CheckRefreshToken')) {
    return next(request);
  }

  const user = userAut.currentUser;
  // console.log(user);
  if (user?.token) {
    
    
    if (userAut.isTokenExpired(user.token)) {
      return handleTokenExpired(request, next, userAut, router);
    }

    return next(addToken(request, user.token));
  }

  return next(request);
};

function handleTokenExpired(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  userAut: AuthService,
  router: Router
): Observable<HttpEvent<any>> {

  if (!refreshInProgress) {
    refreshInProgress = true;
    refreshTokenSubject.next(null);

    return userAut.refreshAccessToken().pipe(
      switchMap(newUser => {
        refreshInProgress = false;
        refreshTokenSubject.next(newUser);

        return next(addToken(request, newUser.token));
      }),
      catchError(error => {
        refreshInProgress = false;
        userAut.logout();
        router.navigateByUrl('/login');
        return throwError(() => error);
      })
    );
  }

  // Wait for refresh to complete
  return refreshTokenSubject.pipe(
    filter(user => user !== null),
    take(1),
    switchMap(user => next(addToken(request, user.token)))
  );
}

function addToken(
  request: HttpRequest<any>,
  token: string
): HttpRequest<any> {
  return request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}
