import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerQualificationsComponent } from './jobseeker-qualifications.component';

describe('JobseekerQualificationsComponent', () => {
  let component: JobseekerQualificationsComponent;
  let fixture: ComponentFixture<JobseekerQualificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerQualificationsComponent]
    });
    fixture = TestBed.createComponent(JobseekerQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
