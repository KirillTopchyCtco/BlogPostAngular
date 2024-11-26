import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Comment } from '../../models/comment';
import { CommentComponent } from '../comment/comment.component';
import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  const mockComments: Comment[] = [
    { postId: 1, id: 1, name: 'John Doe', email: 'johndoe@test.com', body: 'This is a comment' },
    { postId: 2, id: 2, name: 'John Doe2', email: 'johndoe2@test.com', body: 'This is a comment2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommentComponent,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        CommentListComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display posts', () => {
    component.comments = mockComments;
    fixture.detectChanges();

    const postElements = fixture.debugElement.queryAll(By.css('app-comment'));
    expect(postElements.length).toBe(2);
  });

  it('should display error message', () => {
    const errorMessage = 'Error';
    component.errorMessage = errorMessage;
    fixture.detectChanges();

    const pElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(pElement.textContent).toContain(errorMessage);
  });
});
