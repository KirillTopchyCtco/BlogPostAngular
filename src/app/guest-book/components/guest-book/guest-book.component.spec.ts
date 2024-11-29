import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GuestBookMessage } from '../../models/guestBookMessage';
import { getError, getGuestBookMessages } from '../../state';
import { GuestBookActions } from '../../state/guest-book.actions';
import { GuestMessageComponent } from '../guest-message/guest-message.component';
import { GuestBookComponent } from './guest-book.component';

describe('GuestBookComponent', () => {
  let component: GuestBookComponent;
  let fixture: ComponentFixture<GuestBookComponent>;
  let store: MockStore;
  const initialState = {
    guestBookMessages: [],
    error: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatIconModule, MatButtonModule, GuestMessageComponent, GuestBookComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GuestBookComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadGuestBookMessages action on init', () => {
    const spy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(GuestBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(GuestBookActions.loadGuestBookMessages());
  });

  it('should select guestBookMessages from the store', () => {
    const mockMessages: GuestBookMessage[] = [
      { id: '1', author: { name: 'Author 1', email: 'author1@example.com' }, message: 'Message 1' },
      { id: '2', author: { name: 'Author 2', email: 'author2@example.com' }, message: 'Message 2' }
    ];
    store.overrideSelector(getGuestBookMessages, mockMessages);
    store.refreshState();
    fixture.detectChanges();

    component.guestBookMessages$.subscribe(messages => {
      expect(messages.length).toBe(2);
      expect(messages).toEqual(mockMessages);
    });
  });

  it('should select errorMessage from the store', () => {
    const mockError = 'An error occurred';
    store.overrideSelector(getError, mockError);
    store.refreshState();
    fixture.detectChanges();

    component.errorMessage$.subscribe(error => {
      expect(error).toBe(mockError);
    });
  });
});
