import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleListActions } from '../data-access/+state/article-list/article-list.actions';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import {articleListQuery} from "../data-access/+state/article-list/article-list.selectors";
import {articlesActions} from "../data-access/+state/articles.actions";

@Component({
  selector: 'app-article-list',
  standalone: true,
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  imports: [CommonModule, ArticleListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  totalPages$ = this.store.select(articleListQuery.selectTotalPages);
  articles$ = this.store.select(articleListQuery.selectArticleEntities);
  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  isLoading$ = this.store.select(articleListQuery.isLoading);

  constructor(private readonly store: Store, private readonly router: Router) {}

  favorite(slug: string) {
    this.store.dispatch(articlesActions.favorite({ slug }));
  }

  unFavorite(slug: string) {
    this.store.dispatch(articlesActions.unfavorite({ slug }));
  }

  navigateToArticle(slug: string) {
    this.router.navigate(['/article', slug]);
  }

  setPage(page: number) {
    this.store.dispatch(articleListActions.setListPage({ page }));
  }
}
