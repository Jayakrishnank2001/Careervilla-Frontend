import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerForgotPasswordComponent } from './employer-forgot-password.component';

describe('EmployerForgotPasswordComponent', () => {
  let component: EmployerForgotPasswordComponent;
  let fixture: ComponentFixture<EmployerForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(EmployerForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
