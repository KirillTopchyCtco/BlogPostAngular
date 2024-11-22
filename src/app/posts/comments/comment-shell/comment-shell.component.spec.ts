import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentShellComponent } from './comment-shell.component';

describe('CommentShellComponent', () => {
  let component: CommentShellComponent;
  let fixture: ComponentFixture<CommentShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentShellComponent]
    });
    fixture = TestBed.createComponent(CommentShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
