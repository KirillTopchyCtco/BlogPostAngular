import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostService } from '../post.service';
import { PostActions } from './post.actions';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) { }

  loadBlogPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.loadPosts),
      switchMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => PostActions.loadPostsSuccess({ posts: posts })),
          catchError((error) => of(PostActions.loadPostsFailure({ error })))
        )
      )
    );
  });
}
