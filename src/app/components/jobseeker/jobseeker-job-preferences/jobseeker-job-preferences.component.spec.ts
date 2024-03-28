import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerJobPreferencesComponent } from './jobseeker-job-preferences.component';

describe('JobseekerJobPreferencesComponent', () => {
  let component: JobseekerJobPreferencesComponent;
  let fixture: ComponentFixture<JobseekerJobPreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerJobPreferencesComponent]
    });
    fixture = TestBed.createComponent(JobseekerJobPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
