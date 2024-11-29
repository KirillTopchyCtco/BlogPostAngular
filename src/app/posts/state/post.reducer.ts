import { createReducer, on } from "@ngrx/store";
import { Post } from "../models/post";
import { PostActions } from './post.actions';

export interface PostState {
    currentBlogPostId: number | null;
    posts: Post[];
    error: string;
};

const initialState: PostState = {
    currentBlogPostId: null,
    posts: [],
    error: ''
};

export const blogPostReducer = createReducer<PostState>(
    initialState,
    on(PostActions.loadPostsSuccess, (state, action): PostState => {
        return {
            ...state,
            posts: action.posts,
            error: ''
        }
    }),
    on(PostActions.loadPostsFailure, (state, action): PostState => {
        return {
            ...state,
            posts: [],
            error: action.error
        }
    }),
);
