import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerNavComponent } from './jobseeker-nav.component';

describe('JobseekerNavComponent', () => {
  let component: JobseekerNavComponent;
  let fixture: ComponentFixture<JobseekerNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerNavComponent]
    });
    fixture = TestBed.createComponent(JobseekerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
