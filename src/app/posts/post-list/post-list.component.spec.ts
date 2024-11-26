import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { Post } from '../models/post';
import { PostComponent } from '../post/post.component';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Content 1' },
    { id: 2, userId: 2, title: 'Post 2', body: 'Content 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PostComponent,
        MatCardModule,
        PostListComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display posts', () => {
    component.posts = mockPosts;
    fixture.detectChanges();

    const postElements = fixture.debugElement.queryAll(By.css('app-post'));
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
