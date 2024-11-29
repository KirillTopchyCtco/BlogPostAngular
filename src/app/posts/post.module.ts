import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../sheared/shared.module';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentEffects } from './comments/state/comment.effects';
import { commentsReducer } from './comments/state/comment.reducer';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { PostEffects } from './state/post.effects';
import { blogPostReducer } from './state/post.reducer';

const postRoutes: Routes = [
  { path: '', component: PostListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(postRoutes),
    StoreModule.forFeature('posts', blogPostReducer),
    StoreModule.forFeature('comments', commentsReducer),
    EffectsModule.forFeature([PostEffects, CommentEffects]),
    PostListComponent,
    PostComponent,
    CommentListComponent,
    CommentComponent
  ],
})
export class PostModule { }
