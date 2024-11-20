import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { getError, getPostComments } from '../state';
import { CommentActions } from '../state/comment.actions';

@Component({
  selector: 'app-comment-shell',
  templateUrl: './comment-shell.component.html',
  styleUrls: ['./comment-shell.component.scss'],
  standalone: true,
  imports: [CommentListComponent, CommonModule],
})
export class CommentShellComponent implements OnInit {
  comments$: Observable<Comment[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store) {
    this.comments$ = this.store.select(getPostComments);
    this.errorMessage$ = this.store.select(getError);
  }

  ngOnInit(): void {
    this.store.dispatch(CommentActions.loadComments(1));
  }
}
