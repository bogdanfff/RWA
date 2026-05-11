import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn, Router } from '@angular/router';
import { map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../../auth/data-access/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const role = inject(AuthService);
  const router = inject(Router);
  const routeSegment = state.url.split('/')[1];
  const allowedRoles = ['Administrator' , 'SuperHead' ,'HeadOfPlant','HeadOfProduction', 'Member']
console.log('uso u guard');

  return role.user$.pipe(
    take(1),
    switchMap(user => { return user ? of(user) : role.initializeUser() }),
    map(user => user?.role),
    map(userRole => {
      if (!userRole) {
        router.navigateByUrl('/login')
        return false;
      }
      else if (allowedRoles.includes(userRole)) {
        console.log('proso je guard');
        
        // if(routeSegment === 'hourly' && userRole === 'SuperHead'){
        //   return false
        // }
        return true;
      }else {
        console.log('ne prolazi', userRole);
        
        return false
      }
    })
  );
}