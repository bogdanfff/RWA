import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateModule, TranslateLoader, provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { jwtInterceptor } from './shared/interceptors/api-key.interceptor';
import { provideStore } from '@ngrx/store';
import { teamsReducer } from './store/teams/teams.reducer';
import { provideEffects } from '@ngrx/effects';
import { TeamsEffects } from './store/teams/teams.effects';
import { segmentsReducer } from './store/segments/segments.reducer';
import { SegmentsEffects } from './store/segments/segments.effects';
import { UsersEffects } from './store/users/users.effects';
import { LinesEffects } from './store/lines/lines.effects';
import { usersReducer } from './store/users/users.reducer';
import { linesReducer } from './store/lines/lines.reducer';
import { ErrorEffects } from './store/core/error.effects';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HourliesEffects } from './store/hourlies/hourlies.effects';
import { hourlysReducer } from './store/hourlies/hourlies.reducer';

export const appConfig: ApplicationConfig = {
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideStore({ teams: teamsReducer, segments: segmentsReducer, lines: linesReducer, users: usersReducer,hourlies:hourlysReducer }), // root store
    provideEffects([TeamsEffects,SegmentsEffects,UsersEffects,LinesEffects,ErrorEffects,HourliesEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
      ])
    ),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en-US',
      lang: 'en-US'
    }),
    provideAnimationsAsync()
  ]
};