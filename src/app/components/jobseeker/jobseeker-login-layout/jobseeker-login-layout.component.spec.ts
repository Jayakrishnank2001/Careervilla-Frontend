import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerLoginLayoutComponent } from './jobseeker-login-layout.component';

describe('JobseekerLoginLayoutComponent', () => {
  let component: JobseekerLoginLayoutComponent;
  let fixture: ComponentFixture<JobseekerLoginLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerLoginLayoutComponent]
    });
    fixture = TestBed.createComponent(JobseekerLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
