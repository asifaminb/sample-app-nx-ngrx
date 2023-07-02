import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { articleListEffects, articleListFeature } from '@asiforg/articles';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [provideState(articleListFeature), provideEffects(articleListEffects)],
  },
];
