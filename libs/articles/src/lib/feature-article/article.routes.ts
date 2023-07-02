import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ArticleGuardService } from './article-guard.service';
import { ArticleComponent } from './article.component';
import {articleFeature} from "../data-access/+state/article/article.reducer";
import * as articleEffects from '../data-access/+state/article/article.effects';

export const ARTICLE_ROUTES: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
    providers: [provideState(articleFeature), provideEffects(articleEffects)],
    canActivate: [ArticleGuardService],
  },
];
