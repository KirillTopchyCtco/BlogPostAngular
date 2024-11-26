import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { GuestBookMessage } from '../../models/guestBookMessage';
import { GuestBookActions } from '../../state/guest-book.actions';
import { GuestBookMessageState } from '../../state/guest-book.reducer';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-message-dialog.component.html',
  styleUrls: ['./new-message-dialog.component.scss'],
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
export class NewMessageDialogComponent {
  errorMessage$ = this.store.select(GuestBookActions.createGuestBookMessageFailure);
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  message = new FormControl('', [Validators.required, Validators.minLength(20)]);

  constructor(
    private dialogRef: MatDialogRef<NewMessageDialogComponent>,
    private store: Store<GuestBookMessageState>,
  ) { }

  dismiss() {
    this.dialogRef.close(null);
  }

  save() {
    const guestBookMessage: GuestBookMessage = {
      id: this.generateGUID(),
      message: this.message.value!,
      author: {
        name: this.name.value!,
        email: this.email.value
      }
    };

    this.store.dispatch(GuestBookActions.createGuestBookMessage(guestBookMessage));
    this.dialogRef.close(guestBookMessage);
  }

  nameErrorMessage() {
    return this.name.hasError('required') ? `You must enter a name` : '';
  }

  emailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }
    return this.email.hasError('email') ? 'You must enter a valid email' : '';
  }

  messageErrorMessage() {
    if (this.message.hasError('required')) {
      return 'You must enter a message';
    }
    return this.message.hasError('minlength') ? 'Message length must be at least 20 characters' : '';
  }

  private generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
