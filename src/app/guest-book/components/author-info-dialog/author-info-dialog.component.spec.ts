import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInfoDialogComponent } from './author-info-dialog.component';

describe('AuthorInfoDialogComponent', () => {
  let component: AuthorInfoDialogComponent;
  let fixture: ComponentFixture<AuthorInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorInfoDialogComponent]
    });
    fixture = TestBed.createComponent(AuthorInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
