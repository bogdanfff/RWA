import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './shared/ui/layout/layout.component';
import { LoginComponent } from './shared/ui/login/login.component';
import { loginGuard } from './shared/guards/login.guard';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        // canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
                canActivate: [authGuard]

            },
            {
                path: 'users',
                loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
                canActivate: [authGuard]

            },
            {
                path: 'segments',
                loadComponent: () => import('./segment/segment.component').then(m => m.SegmentComponent),
                canActivate: [authGuard]

            },
            {
                path: 'teams',
                loadComponent: () => import('./teams/teams.component').then(m => m.TeamsComponent),
                canActivate: [authGuard]

            },
            {
                path: 'lines',
                loadComponent: () => import('./line/line.component').then(m => m.LineComponent),
                canActivate: [authGuard]
            },
            {
                path: 'hourly',
                loadComponent: () => import('./hourly/hourly.component').then(m => m.HourlyComponent),
                canActivate: [authGuard]
            }
           

        ],
    },
    {
        path: '',
        component: LoginComponent,
        canActivate: [loginGuard],
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                loadComponent: () => import('./auth/feature/auth-page/auth-page.component').then(m => m.AuthPageComponent),
                data: { animation: 999 },
                // resolve: {
                //     imageLoaded: () => {
                //         return loadImages(['assets/images/login & preloader/login.png'])
                //     }

                // }

            }
        ]
    },
    {
        path: '**',
        redirectTo: 'levels'
    },

];