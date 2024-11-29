import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CommentActions } from '../state/comment.actions';
import { CommentShellComponent } from './comment-shell.component';

describe('CommentShellComponent', () => {
  let component: CommentShellComponent;
  let fixture: ComponentFixture<CommentShellComponent>;
  let store: MockStore;
  const initialState = {
    component: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        CommentListComponent,
        CommentShellComponent
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ postId: 1 })
          }
        },
        {
          provide: Router,
          useValue: {
            url: '/comments/1',
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CommentShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadComments action on init', () => {
    const storeSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(storeSpy).toHaveBeenCalledWith(CommentActions.loadComments(1));
  });
});
