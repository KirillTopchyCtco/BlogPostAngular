import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostService } from '../../post.service';
import { CommentActions } from './comment.actions';

@Injectable()
export class CommentEffects {
  constructor(private actions$: Actions, private commentService: PostService) { }

  loadPostComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.loadComments),
      switchMap(action =>
        this.commentService.getComments(action.postId).pipe(
          map((comments) => CommentActions.loadCommentsSuccess({ comments: comments })),
          catchError((error) => of(CommentActions.loadCommentsFailure({ error })))
        )
      )
    );
  });
}
