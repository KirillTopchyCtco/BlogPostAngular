import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../sheared/shared.module';
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
    EffectsModule.forFeature([PostEffects]),
    PostListComponent,
    PostComponent
  ]
})
export class PostModule { }
