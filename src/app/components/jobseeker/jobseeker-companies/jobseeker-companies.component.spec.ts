import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerCompaniesComponent } from './jobseeker-companies.component';

describe('JobseekerCompaniesComponent', () => {
  let component: JobseekerCompaniesComponent;
  let fixture: ComponentFixture<JobseekerCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobseekerCompaniesComponent]
    });
    fixture = TestBed.createComponent(JobseekerCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
