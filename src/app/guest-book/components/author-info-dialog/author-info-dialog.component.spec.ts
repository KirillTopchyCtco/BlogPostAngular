import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Author } from '../../models/author';
import { AuthorInfoDialogComponent } from './author-info-dialog.component';

describe('AuthorInfoDialogComponent', () => {
  let component: AuthorInfoDialogComponent;
  let fixture: ComponentFixture<AuthorInfoDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AuthorInfoDialogComponent>>;
  const mockAuthor: Author = { name: 'John Doe', email: 'john.doe@example.com' };

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        AuthorInfoDialogComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockAuthor }
      ]
    }).compileComponents();

    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AuthorInfoDialogComponent>>;
    fixture = TestBed.createComponent(AuthorInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display author name and email', () => {
    const nameInput = fixture.debugElement.query(By.css('input[placeholder="Name"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;

    expect(nameInput.value).toBe(mockAuthor.name);
    expect(emailInput.value).toBe(mockAuthor.email);
  });

  it('should close the dialog when dismiss is called', () => {
    component.dismiss();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
