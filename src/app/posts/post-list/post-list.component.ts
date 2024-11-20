import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../models/post';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  standalone: true,
  imports: [CommonModule, PostComponent, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent {
  @Input() errorMessage!: string;
  @Input() posts: Post[] = [];
}
