import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerLoginComponent } from './jobseeker-login.component';

describe('JobseekerLoginComponent', () => {
  let component: JobseekerLoginComponent;
  let fixture: ComponentFixture<JobseekerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerLoginComponent]
    });
    fixture = TestBed.createComponent(JobseekerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
