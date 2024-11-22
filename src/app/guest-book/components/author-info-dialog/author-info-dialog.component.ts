import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Author } from '../../models/author';

@Component({
  selector: 'app-author-info-dialog',
  templateUrl: './author-info-dialog.component.html',
  styleUrls: ['./author-info-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorInfoDialogComponent {
  constructor(private dialogRef: MatDialogRef<AuthorInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public author: Author) { }

  dismiss() {
    this.dialogRef.close(null);
  }
}
