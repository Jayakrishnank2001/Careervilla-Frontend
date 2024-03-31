import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportJobComponent } from './report-job.component';

describe('ReportJobComponent', () => {
  let component: ReportJobComponent;
  let fixture: ComponentFixture<ReportJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportJobComponent]
    });
    fixture = TestBed.createComponent(ReportJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
