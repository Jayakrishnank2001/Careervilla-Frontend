import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerManageJobsComponent } from './employer-manage-jobs.component';

describe('EmployerManageJobsComponent', () => {
  let component: EmployerManageJobsComponent;
  let fixture: ComponentFixture<EmployerManageJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerManageJobsComponent]
    });
    fixture = TestBed.createComponent(EmployerManageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
