import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let router: Router;
  let routerSpy: jasmine.Spy;

  const mockPost: Post = {
    userId: 1,
    id: 1,
    title: 'Test Post',
    body: 'This is a test post.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        PostComponent
      ],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    routerSpy = router.navigate as jasmine.Spy;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display post title and content', () => {
    const postHeader = fixture.debugElement.query(By.css('.post-header')).nativeElement;
    const postBody = fixture.debugElement.query(By.css('.post-content')).nativeElement;

    expect(postHeader.textContent).toContain(mockPost.title);
    expect(postBody.textContent).toContain(mockPost.body);
  });

  it('should navigate to comments on comment button click', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalledWith(['posts/comments', mockPost.id]);
  });
});
