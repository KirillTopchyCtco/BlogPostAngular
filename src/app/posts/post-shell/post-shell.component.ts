import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostListComponent } from "../post-list/post-list.component";
import { getError, getBlogPosts as getPosts } from '../state';
import { PostActions } from '../state/post.actions';


@Component({
  selector: 'app-post-shell',
  templateUrl: './post-shell.component.html',
  styleUrls: ['./post-shell.component.scss'],
  imports: [PostListComponent, CommonModule],
  standalone: true,
})
export class PostShellComponent implements OnInit {
  posts$: Observable<Post[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store) {
    this.posts$ = this.store.select(getPosts);
    this.errorMessage$ = this.store.select(getError);
  }

  ngOnInit(): void {
    this.store.dispatch(PostActions.loadPosts());
  }
}
