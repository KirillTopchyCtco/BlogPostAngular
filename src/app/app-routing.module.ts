import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
