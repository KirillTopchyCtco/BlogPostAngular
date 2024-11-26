import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from 'rxjs';
import { Comment } from './models/comment';
import { Post } from './models/post';


@Injectable({
  providedIn: 'root',
})

export class PostService {

  private baseUrl = 'http://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'posts')
      .pipe(catchError(this.handleError));
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + `/post/${postId}/comments`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
