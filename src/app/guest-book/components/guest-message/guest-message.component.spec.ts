import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestMessageComponent } from './guest-message.component';

describe('GuestMessageComponent', () => {
  let component: GuestMessageComponent;
  let fixture: ComponentFixture<GuestMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestMessageComponent]
    });
    fixture = TestBed.createComponent(GuestMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
