import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { getError, getGuestBookMessages } from '../../state';
import { GuestBookActions } from '../../state/guest-book.actions';
import { GuestBookMessageState } from '../../state/guest-book.reducer';
import { GuestMessageComponent } from '../guest-message/guest-message.component';

@Component({
  selector: 'app-guest-messages-list',
  templateUrl: './guest-book.component.html',
  styleUrls: ['./guest-book.component.scss'],
  standalone: true,
  imports: [GuestMessageComponent, CommonModule, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestBookComponent {

  guestBookMessages$ = this.store.select(getGuestBookMessages);
  errorMessage$= this.store.select(getError);

  constructor(private store: Store<GuestBookMessageState>) {
    this.store.dispatch(GuestBookActions.loadGuestBookMessages());
  }
}
