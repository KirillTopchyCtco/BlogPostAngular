import { createReducer, on } from "@ngrx/store";
import { Comment } from "../../models/comment";
import { CommentActions } from "./comment.actions";

export interface CommentState {
    comments: Comment[];
    error: string;
};

const initialState: CommentState = {
    comments: [],
    error: ''
};

export const commentsReducer = createReducer<CommentState>(
    initialState,
    on(CommentActions.loadCommentsSuccess, (state, action): CommentState => {
        return {
            ...state,
            comments: action.comments,
            error: ''
        }
    }),
    on(CommentActions.loadCommentsFailure, (state, action): CommentState => {
        return {
            ...state,
            comments: [],
            error: action.error
        }
    }),
);
