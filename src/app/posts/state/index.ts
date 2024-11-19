import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { PostState } from './post.reducer';

export interface State extends AppState.State {
    blogPosts: PostState;
};

const getBlogPostsFeatureState = createFeatureSelector<PostState>('posts');

export const getBlogPosts = createSelector(
    getBlogPostsFeatureState,
    state => state.posts
);

export const getError = createSelector(
    getBlogPostsFeatureState,
    state => state.error
);
