import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Comment } from '../../models/comment';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  standalone: true,
  imports: [CommentComponent, CommonModule, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {

  @Input() errorMessage!: string;
  @Input() comments: Comment[] = [];

  constructor(private router: Router) { }

  onHomeClick() {
    this.router.navigate(['/posts']);
  }
}
