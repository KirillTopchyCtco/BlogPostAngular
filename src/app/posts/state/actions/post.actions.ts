import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/posts/post";

export const loadPosts = createAction(
    '[Blog Posts API] Load',
)

export const loadPostsSuccess = createAction(
    '[Blog Posts API] Load Success',
    props<{ posts: Post[] }>()
)

export const loadPostsFailure = createAction(
    '[Blog Posts API] Load Failure',
    props<{ error: string }>()
)
