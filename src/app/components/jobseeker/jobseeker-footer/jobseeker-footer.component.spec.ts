import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerFooterComponent } from './jobseeker-footer.component';

describe('JobseekerFooterComponent', () => {
  let component: JobseekerFooterComponent;
  let fixture: ComponentFixture<JobseekerFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerFooterComponent]
    });
    fixture = TestBed.createComponent(JobseekerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
