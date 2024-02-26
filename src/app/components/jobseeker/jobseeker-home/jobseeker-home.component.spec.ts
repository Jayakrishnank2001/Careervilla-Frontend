import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerHomeComponent } from './jobseeker-home.component';

describe('JobseekerHomeComponent', () => {
  let component: JobseekerHomeComponent;
  let fixture: ComponentFixture<JobseekerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerHomeComponent]
    });
    fixture = TestBed.createComponent(JobseekerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
