import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { authGuard } from '@asiforg/auth';
import { ArticleEditComponent } from './article-edit.component';
import { articleEditResolver } from './resolvers/article-edit-resolver';
import {articleFeature} from "../data-access/+state/article/article.reducer";
// import {articleEditEffects} from "../data-access/+state/article-edit/article-edit.effects";
import * as articleEditEffects from '../data-access/+state/article-edit/article-edit.effects';
// ./lib/data-access/+state/article-edit/article-edit.effects
export const ARTICLE_EDIT_ROUTES: Routes = [
  {
    path: '',
    component: ArticleEditComponent,
    providers: [provideState(articleFeature), provideEffects(articleEditEffects)],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleEditComponent,
        canActivate: [authGuard],
      },
      {
        path: ':slug',
        component: ArticleEditComponent,
        resolve: { articleEditResolver },
      },
    ],
  },
];
