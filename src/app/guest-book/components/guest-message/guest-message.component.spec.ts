import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GuestBookMessage } from '../../models/guestBookMessage';
import { AuthorInfoDialogComponent } from '../author-info-dialog/author-info-dialog.component';
import { GuestMessageComponent } from './guest-message.component';

describe('GuestMessageComponent', () => {
  let component: GuestMessageComponent;
  let fixture: ComponentFixture<GuestMessageComponent>;
  let dialog: MatDialog;
  let dialogSpy: jasmine.Spy;

  const mockGuestBookMessage: GuestBookMessage = {
    id: '1',
    author: { name: 'John Doe', email: 'john.doe@example.com' },
    message: 'This is a test message'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule, GuestMessageComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestMessageComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    dialogSpy = dialog.open as jasmine.Spy;
    component.guestBookMessage = mockGuestBookMessage;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display guest book message', () => {
    const messageElement = fixture.debugElement.query(By.css('.message'));
    expect(messageElement).toBeTruthy();
    expect(messageElement.nativeElement.textContent).toContain(mockGuestBookMessage.message);
  });

  it('should open author info dialog on info click', () => {
    const button = fixture.debugElement.query(By.css('button[mat-mini-fab]'));
    expect(button).toBeTruthy();
    button.nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(dialogSpy).toHaveBeenCalledWith(AuthorInfoDialogComponent, {
        width: '450px',
        data: mockGuestBookMessage.author
      });
    });
  });
});
