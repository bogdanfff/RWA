import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn, Router } from '@angular/router';
import { map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../../auth/data-access/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const role = inject(AuthService);
  const router = inject(Router);
  const routeSegment = state.url.split('/')[1];
  const allowedSegments = ['incidentInput', 'incidentCode', 'incidentCategory', 'incidentDepartment', 'comments', 'teams', 'lineReports', 'teamReports', 'hourly', 'assignTeam', 'statistics'];
// console.log('uso u guard');

  return role.user$.pipe(
    take(1),
    switchMap(user => { return user ? of(user) : role.initializeUser() }),
    switchMap(user => {
      return of(user?.role);
    }),
    map(userRole => {
      if (!userRole) {
        router.navigateByUrl('/login')
        return false;
      }
      else if (userRole === 'Administrator' || userRole === 'SuperHead' || userRole === 'HeadOfPlant' || userRole === 'HeadOfProduction') {
        // if(routeSegment === 'hourly' && userRole === 'SuperHead'){
        //   return false
        // }
        return true;
      }
      else if (allowedSegments.includes(routeSegment)) {
        return true

      } else {
        return false
      }
    })
  );
}