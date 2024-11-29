import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Comment } from './models/comment';
import { Post } from './models/post';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Post 1', body: 'This is post 1' },
    { userId: 2, id: 2, title: 'Post 2', body: 'This is post 2' }
  ];

  const mockComments: Comment[] = [
    { postId: 1, id: 1, name: 'Comment 1', email: 'comment1@test.com', body: 'This is comment 1' },
    { postId: 1, id: 2, name: 'Comment 2', email: 'comment2@test.com', body: 'This is comment 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts', () => {
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(service['baseUrl'] + 'posts');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should handle error on getPosts', () => {
    service.getPosts().subscribe(
      () => fail('should have failed with the 500 error'),
      (error: any) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(service['baseUrl'] + 'posts');
    expect(req.request.method).toBe('GET');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should fetch comments for a post', () => {
    const postId = 1;
    service.getComments(postId).subscribe(comments => {
      expect(comments.length).toBe(2);
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(service['baseUrl'] + `/post/${postId}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should handle error on getComments', () => {
    const postId = 1;
    service.getComments(postId).subscribe(
      () => fail('should have failed with the 500 error'),
      (error: any) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(service['baseUrl'] + `/post/${postId}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });
});
