import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerMyJobsComponent } from './jobseeker-my-jobs.component';

describe('JobseekerMyJobsComponent', () => {
  let component: JobseekerMyJobsComponent;
  let fixture: ComponentFixture<JobseekerMyJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerMyJobsComponent]
    });
    fixture = TestBed.createComponent(JobseekerMyJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
