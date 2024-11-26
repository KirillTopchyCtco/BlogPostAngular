import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Author } from '../../models/author';
import { GuestBookMessage } from '../../models/guestBookMessage';
import { AuthorInfoDialogComponent } from '../author-info-dialog/author-info-dialog.component';

@Component({
  selector: 'app-guest-message',
  templateUrl: './guest-message.component.html',
  styleUrls: ['./guest-message.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestMessageComponent {
  @Input() guestBookMessage!: GuestBookMessage;

  constructor(
    private dialog: MatDialog,
  ) { }

  onInfoClick(author: Author) {
    this.dialog.open(AuthorInfoDialogComponent, {
      width: '450px',
      data: author
    });
  }
}
