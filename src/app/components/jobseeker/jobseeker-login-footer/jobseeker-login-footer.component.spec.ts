import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerLoginFooterComponent } from './jobseeker-login-footer.component';

describe('JobseekerLoginFooterComponent', () => {
  let component: JobseekerLoginFooterComponent;
  let fixture: ComponentFixture<JobseekerLoginFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerLoginFooterComponent]
    });
    fixture = TestBed.createComponent(JobseekerLoginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
