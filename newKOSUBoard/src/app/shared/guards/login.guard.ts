import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../../auth/data-access/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    switchMap(user => user ? of(user) : authService.initializeUser()),
    map(user => {
      if (user) {
        // User is logged in → redirect to home
        router.navigateByUrl('/home');
        return false;
      } 
      // Not logged in → allow access to login page
      return true;
    })
  );
};
