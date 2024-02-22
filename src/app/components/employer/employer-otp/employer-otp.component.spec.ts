import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerOTPComponent } from './employer-otp.component';

describe('EmployerOTPComponent', () => {
  let component: EmployerOTPComponent;
  let fixture: ComponentFixture<EmployerOTPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerOTPComponent]
    });
    fixture = TestBed.createComponent(EmployerOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
