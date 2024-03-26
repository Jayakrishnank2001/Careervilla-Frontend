import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneNumberComponent } from './change-phone-number.component';

describe('ChangePhoneNumberComponent', () => {
  let component: ChangePhoneNumberComponent;
  let fixture: ComponentFixture<ChangePhoneNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePhoneNumberComponent]
    });
    fixture = TestBed.createComponent(ChangePhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
