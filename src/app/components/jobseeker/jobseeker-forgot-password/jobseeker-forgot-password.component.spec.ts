import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerForgotPasswordComponent } from './jobseeker-forgot-password.component';

describe('JobseekerForgotPasswordComponent', () => {
  let component: JobseekerForgotPasswordComponent;
  let fixture: ComponentFixture<JobseekerForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(JobseekerForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
