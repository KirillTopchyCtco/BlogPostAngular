import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from './post.reducer';

const getBlogPostsFeatureState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(
    getBlogPostsFeatureState,
    state => state.posts
);

export const getError = createSelector(
    getBlogPostsFeatureState,
    state => state.error
);
