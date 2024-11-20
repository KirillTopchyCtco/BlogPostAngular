import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommentState } from "./comment.reducer";

const getPostCommentsFeatureState = createFeatureSelector<CommentState>('comments');

export const getPostComments = createSelector(
    getPostCommentsFeatureState,
    state => state.comments
);

export const getError = createSelector(
    getPostCommentsFeatureState,
    state => state.error
);
