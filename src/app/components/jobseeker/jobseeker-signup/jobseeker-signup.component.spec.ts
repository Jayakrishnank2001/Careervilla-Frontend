import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerSignupComponent } from './jobseeker-signup.component';

describe('JobseekerSignupComponent', () => {
  let component: JobseekerSignupComponent;
  let fixture: ComponentFixture<JobseekerSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerSignupComponent]
    });
    fixture = TestBed.createComponent(JobseekerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
