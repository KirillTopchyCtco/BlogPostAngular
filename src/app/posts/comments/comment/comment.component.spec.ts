import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Comment } from '../../models/comment';
import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        CommentComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  const commentMock: Comment = { postId: 1, id: 1, name: 'John Doe', email: 'johndoe@test.com', body: 'This is a comment' };

  it('should create', () => {
    component.comment = commentMock;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the comment name', () => {
    component.comment = commentMock;
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.comment-header mat-card-title')).nativeElement;
    expect(nameElement.textContent).toContain(commentMock.name);
  });

  it('should display the comment body', () => {
    component.comment = commentMock;
    fixture.detectChanges();

    const bodyElement = fixture.debugElement.query(By.css('.comment-content')).nativeElement;
    expect(bodyElement.textContent).toContain(commentMock.body);
  });
});
