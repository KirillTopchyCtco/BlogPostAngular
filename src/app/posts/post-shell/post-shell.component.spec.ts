import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShellComponent } from './post-shell.component';

describe('BlogPostShellComponent', () => {
  let component: PostShellComponent;
  let fixture: ComponentFixture<PostShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostShellComponent]
    });
    fixture = TestBed.createComponent(PostShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
