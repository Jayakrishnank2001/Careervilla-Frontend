import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportedJobsComponent } from './admin-reported-jobs.component';

describe('AdminReportedJobsComponent', () => {
  let component: AdminReportedJobsComponent;
  let fixture: ComponentFixture<AdminReportedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportedJobsComponent]
    });
    fixture = TestBed.createComponent(AdminReportedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
