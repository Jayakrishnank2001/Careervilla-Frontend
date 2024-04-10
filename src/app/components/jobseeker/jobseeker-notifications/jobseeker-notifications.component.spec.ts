import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerNotificationsComponent } from './jobseeker-notifications.component';

describe('JobseekerNotificationsComponent', () => {
  let component: JobseekerNotificationsComponent;
  let fixture: ComponentFixture<JobseekerNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerNotificationsComponent]
    });
    fixture = TestBed.createComponent(JobseekerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
