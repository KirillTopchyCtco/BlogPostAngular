import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/posts/post";

const loadPosts = createAction(
    '[Blog Posts API] Load',
)

const loadPostsSuccess = createAction(
    '[Blog Posts API] Load Success',
    props<{ posts: Post[] }>()
)

const loadPostsFailure = createAction(
    '[Blog Posts API] Load Failure',
    props<{ error: string }>()
)

export const PostActions = {
    loadPosts,
    loadPostsSuccess,
    loadPostsFailure
}
