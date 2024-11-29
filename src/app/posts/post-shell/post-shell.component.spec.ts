import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Post } from '../models/post';
import { PostComponent } from '../post/post.component';
import { getPosts } from '../state';
import { PostShellComponent } from './post-shell.component';

describe('PostShellComponent', () => {
  let component: PostShellComponent;
  let fixture: ComponentFixture<PostShellComponent>;
  let store: MockStore;
  const initialState = {
    posts: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        PostComponent,
        PostShellComponent
      ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PostShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display PostListComponent with provided Posts', () => {
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: 'Post 1', body: 'Content 1' },
      { id: 2, userId: 2, title: 'Post 2', body: 'Content 2' }
    ];
    store.overrideSelector(getPosts, mockPosts);
    store.refreshState();
    fixture.detectChanges();

    const postList = fixture.debugElement.query(By.css('app-post-list')).componentInstance;
    expect(postList.posts).toEqual(mockPosts);
  });
});
