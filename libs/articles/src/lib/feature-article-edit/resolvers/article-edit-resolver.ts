import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {articleActions} from "../../data-access/+state/article/article.actions";

export const articleEditResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const slug = route.params['slug'];
  const store = inject(Store);

  if (slug) {
    store.dispatch(articleActions.loadArticle({ slug }));
  }

  return of(true);
};
