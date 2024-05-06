import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitlesDialogComponent } from './job-titles-dialog.component';

describe('JobTitlesDialogComponent', () => {
  let component: JobTitlesDialogComponent;
  let fixture: ComponentFixture<JobTitlesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobTitlesDialogComponent]
    });
    fixture = TestBed.createComponent(JobTitlesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
