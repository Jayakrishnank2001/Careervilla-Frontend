import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerMyReviewsComponent } from './jobseeker-my-reviews.component';

describe('JobseekerMyReviewsComponent', () => {
  let component: JobseekerMyReviewsComponent;
  let fixture: ComponentFixture<JobseekerMyReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerMyReviewsComponent]
    });
    fixture = TestBed.createComponent(JobseekerMyReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
