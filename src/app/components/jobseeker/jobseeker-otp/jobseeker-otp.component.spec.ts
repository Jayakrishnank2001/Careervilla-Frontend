import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerOtpComponent } from './jobseeker-otp.component';

describe('JobseekerOtpComponent', () => {
  let component: JobseekerOtpComponent;
  let fixture: ComponentFixture<JobseekerOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerOtpComponent]
    });
    fixture = TestBed.createComponent(JobseekerOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
