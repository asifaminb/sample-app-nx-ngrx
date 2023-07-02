import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRouterStore } from '@ngrx/router-store';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { API_URL } from '@asiforg/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {authFeature, authGuard, tokenInterceptor, authFunctionalEffects} from "@asiforg/auth";
import {errorHandlerFeature, errorHandlingInterceptor, ngrxFormsFeature, ngrxFormsEffects, errorHandlerEffects} from "@asiforg/core";
import {environment} from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('@asiforg/home').then((home) => home.HOME_ROUTES),
      },
      {
        path: 'login',
        loadComponent: () => import('@asiforg/auth').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('@asiforg/auth').then((m) => m.RegisterComponent),
      },
      {
        path: 'article',
        loadChildren: () => import('@asiforg/articles').then((m) => m.ARTICLE_ROUTES),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('@asiforg/settings').then((settings) => settings.SettingsComponent),
      },
      {
        path: 'editor',
        loadChildren: () => import('@asiforg/articles').then((article) => article.ARTICLE_EDIT_ROUTES),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('@asiforg/profile').then((profile) => profile.PROFILE_ROUTES),
      },
    ]),
    provideStore({
      auth: authFeature.reducer,
      errorHandler: errorHandlerFeature.reducer,
      ngrxForms: ngrxFormsFeature.reducer,
    }),
    provideEffects(errorHandlerEffects, ngrxFormsEffects, authFunctionalEffects),
    provideRouterStore(),
    provideHttpClient(withInterceptors([errorHandlingInterceptor, tokenInterceptor])),
    !environment.production ? provideStoreDevtools() : [],
    { provide: API_URL, useValue: environment.api_url },
  ],
};
