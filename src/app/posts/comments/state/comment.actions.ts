import { createAction, props } from "@ngrx/store";
import { Comment } from "src/app/posts/models/comment";

const loadComments = createAction(
    '[Posts Comments API] Load',
    (postId: number) => ({ postId })
)

const loadCommentsSuccess = createAction(
    '[Posts Comments API] Load Success',
    props<{ comments: Comment[] }>()
)

const loadCommentsFailure = createAction(
    '[Posts Comments API] Load Failure',
    props<{ error: string }>()
)

export const CommentActions = {
    loadComments,
    loadCommentsSuccess,
    loadCommentsFailure
}
