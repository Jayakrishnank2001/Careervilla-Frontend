import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerJobsComponent } from './jobseeker-jobs.component';

describe('JobseekerJobsComponent', () => {
  let component: JobseekerJobsComponent;
  let fixture: ComponentFixture<JobseekerJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerJobsComponent]
    });
    fixture = TestBed.createComponent(JobseekerJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
