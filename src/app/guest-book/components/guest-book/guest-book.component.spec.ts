import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookComponent } from './guest-book.component';

describe('GuestBookComponent', () => {
  let component: GuestBookComponent;
  let fixture: ComponentFixture<GuestBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestBookComponent]
    });
    fixture = TestBed.createComponent(GuestBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
