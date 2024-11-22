import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestBookComponent } from './guest-book/components/guest-book/guest-book.component';
import { CommentShellComponent } from './posts/comments/comment-shell/comment-shell.component';
import { PostShellComponent } from './posts/post-shell/post-shell.component';

const routes: Routes = [
  {
    path: '',
    component: PostShellComponent,
    children: [
      {
        path: 'posts',
        loadChildren: () =>
          import('./posts/post.module').then(m => m.PostModule)
      },
      { path: '', redirectTo: '/posts', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: CommentShellComponent,
    children: [
      { path: 'posts/comments/:id', component: CommentShellComponent },
    ],
  },
  {
    path: '',
    component: GuestBookComponent,
    children: [
      {
        path: 'guest-book',
        loadChildren: () =>
          import('./guest-book/guest-book.module').then(m => m.GuestBookModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
