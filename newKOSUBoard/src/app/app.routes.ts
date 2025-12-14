import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './shared/ui/layout/layout.component';
import { LoginComponent } from './shared/ui/login/login.component';
import { loginGuard } from './shared/guards/login.guard';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
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
            }
            ,
            // { 
            //     path: 'assignTeam', 
            //     loadComponent: () => import('./components/assign-team/assign-team.component').then(m => m.AssignTeamComponent),
            //     canActivate:[authGuard]

            // },
            // { 
            //     path: 'hourly', 
            //     loadComponent: () => import('./components/hourly-data/hourly-data.component').then(m => m.HourlyDataComponent),
            //     canActivate:[authGuard]
            // },
            // { 
            //     path: 'comments', 
            //     loadComponent: () => import('./components/comments/comments.component').then(m => m.CommentsComponent),
            //     canActivate:[authGuard]
            // },
            // { 
            //     path: 'statistics', 
            //     loadComponent: () => import('./components/statistics/statistics.component').then(m => m.StatisticsComponent),
            //     canActivate:[authGuard]
            // },
            // { 
            //     path: 'lineView',
            //     loadComponent: () => import('./components/dataView/line-view/line-view.component').then(m => m.LineViewComponent), 
            // },
            // { 
            //     path: 'teamView/:name', 
            //     loadComponent: () => import('./components/dataView/team-view/team-view.component').then(m => m.TeamViewComponent),
            // },
            // { 
            //     path: 'lineReports', 
            //     loadComponent: () => import('./components/reports/report-line/report-line.component').then(m => m.ReportLineComponent),
            //     canActivate:[authGuard]
            // },
            // { 
            //     path: 'teamReports', 
            //     loadComponent: () => import('./components/reports/report-team/report-team.component').then(m => m.ReportTeamComponent),
            //     canActivate:[authGuard]
            // },
            // { 
            //     path: 'incidentInput', 
            //     loadComponent: () => import('./components/incident/input/input.component').then(m => m.InputComponent),
            //     canActivate:[authGuard]
            // },
            // { 
            //     path: 'incidentCode', 
            //     loadComponent: () => import('./components/incident/code/code.component').then(m => m.CodeComponent),
            //     canActivate:[authGuard]
            // },
            // { 
            //     path: 'incidentCategory', 
            //     loadComponent: () => import('./components/incident/category/category.component').then(m => m.CategoryComponent),
            //     canActivate:[authGuard]
            // },
            // { 
            //     path: 'incidentDepartment', 
            //     loadComponent: () => import('./components/incident/department/department.component').then(m => m.DepartmentComponent),
            //     canActivate:[authGuard]
            // },


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