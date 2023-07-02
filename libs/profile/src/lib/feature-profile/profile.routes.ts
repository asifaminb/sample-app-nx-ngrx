import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { articleListEffects, articleListFeature } from '@asiforg/articles';
import { ArticleListComponent } from '@asiforg/articles';
import { authGuard } from '@asiforg/auth';
import { ProfileComponent } from './profile.component';
import {profileFeature} from "../data-access/+state/profile.reducer";
import * as profileEffects from './../data-access/+state/profile.effects';
import {profileResolver} from "../data-access/resolvers/profile-resolver";
import {profileArticlesResolver} from "../data-access/resolvers/profile-articles-resolver";
import {profileFavoritesResolver} from "../data-access/resolvers/profile-favorites-resolver";

export const PROFILE_ROUTES: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    providers: [
      provideState(profileFeature),
      provideState(articleListFeature),
      provideEffects(profileEffects, articleListEffects),
    ],
    resolve: { profileResolver },
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ArticleListComponent,
        resolve: { profileArticlesResolver },
      },
      {
        path: 'favorites',
        component: ArticleListComponent,
        resolve: { profileFavoritesResolver },
      },
    ],
  },
];
