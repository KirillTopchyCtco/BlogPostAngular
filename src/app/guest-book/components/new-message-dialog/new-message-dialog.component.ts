import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { generateGUID } from 'src/app/sheared/shared.utils';
import { GuestBookMessage } from '../../models/guestBookMessage';
import { GuestBookActions } from '../../state/guest-book.actions';
import { GuestBookMessageState } from '../../state/guest-book.reducer';
import { ErrorMessagePipe } from './error-message.pipe';
import { emailValidator, messageValidator, nameValidator } from './new-message-dialog.validator';

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
    CommonModule,
    ErrorMessagePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMessageDialogComponent {
  errorMessage$ = this.store.select(GuestBookActions.createGuestBookMessageFailure);
  form = new FormGroup({
    name: new FormControl('', [nameValidator]),
    email: new FormControl('', [emailValidator]),
    message: new FormControl('', [messageValidator])
  });

  constructor(
    private dialogRef: MatDialogRef<NewMessageDialogComponent>,
    private store: Store<GuestBookMessageState>,
  ) { }

  dismiss() {
    this.dialogRef.close(null);
  }

  save() {
    const guestBookMessage: GuestBookMessage = {
      id: generateGUID(),
      message: this.form.controls.message.value!,
      author: {
        name: this.form.controls.name.value!,
        email: this.form.controls.email.value
      }
    };

    this.store.dispatch(GuestBookActions.createGuestBookMessage(guestBookMessage));
    this.dialogRef.close(guestBookMessage);
  }
}
