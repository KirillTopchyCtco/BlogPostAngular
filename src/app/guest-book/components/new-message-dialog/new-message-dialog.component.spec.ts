import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GuestBookMessage } from '../../models/guestBookMessage';
import { GuestBookActions } from '../../state/guest-book.actions';
import { GuestBookMessageState } from '../../state/guest-book.reducer';
import { NewMessageDialogComponent } from './new-message-dialog.component';

describe('NewMessageDialogComponent', () => {
  let component: NewMessageDialogComponent;
  let fixture: ComponentFixture<NewMessageDialogComponent>;
  let store: MockStore<GuestBookMessageState>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<NewMessageDialogComponent>>;

  const initialState = {
    guestBookMessages: [],
    error: ''
  };

  const mockGuestBookMessage: GuestBookMessage = {
    id: '1',
    author: { name: 'John Doe', email: 'john.doe@example.com' },
    message: 'This is a test message'
  };

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        CommonModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        NewMessageDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<NewMessageDialogComponent>>;
    fixture = TestBed.createComponent(NewMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form controls', () => {
    expect(component.form.controls.name).toBeTruthy();
    expect(component.form.controls.email).toBeTruthy();
    expect(component.form.controls.message).toBeTruthy();
  });

  it('save button should be disabled when invalid name provided', () => {
    component.form.controls.name.setValue('');
    component.form.controls.email.setValue(mockGuestBookMessage.author.email);
    component.form.controls.message.setValue(mockGuestBookMessage.message);
    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    expect(saveButton.disabled).toBeTruthy();
  });

  it('save button should be disabled when invalid email provided', () => {
    component.form.controls.name.setValue(mockGuestBookMessage.author.name);
    component.form.controls.email.setValue('test');
    component.form.controls.message.setValue(mockGuestBookMessage.message);
    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    expect(saveButton.disabled).toBeTruthy();
  });

  it('save button should be disabled when message with lenght smaller than 20 charactes provided', () => {
    component.form.controls.name.setValue(mockGuestBookMessage.author.name);
    component.form.controls.email.setValue(mockGuestBookMessage.author.email);
    component.form.controls.message.setValue('test short message');
    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    expect(saveButton.disabled).toBeTruthy();
  });

  it('save button should be enabled whan all valid fileds provided', () => {
    component.form.controls.name.setValue(mockGuestBookMessage.author.name);
    component.form.controls.email.setValue(mockGuestBookMessage.author.email);
    component.form.controls.message.setValue(mockGuestBookMessage.message);
    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    expect(saveButton.disabled).toBeFalse();
  });

  it('should close the dialog when dismiss is called', () => {
    component.dismiss();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should dispatch createGuestBookMessage action on save', () => {
    const spy = spyOn(store, 'dispatch');
    component.form.controls.name.setValue(mockGuestBookMessage.author.name);
    component.form.controls.email.setValue(mockGuestBookMessage.author.email);
    component.form.controls.message.setValue(mockGuestBookMessage.message);
    component.save();

    expect(spy).toHaveBeenCalledWith(GuestBookActions.createGuestBookMessage({
      id: jasmine.any(String) as unknown as string,
      message: mockGuestBookMessage.message,
      author: {
        name: mockGuestBookMessage.author.name,
        email: mockGuestBookMessage.author.email,
      }
    }));
  });
});
