import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Article, User } from '@asiforg/core';
import { Comment } from '../../data-access/models/comment.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-comment',
  standalone: true,
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input() currentUser!: User;
  @Input() comment!: Comment;
  @Input() article!: Article;
  @Output() delete: EventEmitter<{
    commentId: number;
    slug: string;
  }> = new EventEmitter();
}
