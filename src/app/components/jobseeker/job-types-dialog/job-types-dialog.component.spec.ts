import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypesDialogComponent } from './job-types-dialog.component';

describe('JobTypesDialogComponent', () => {
  let component: JobTypesDialogComponent;
  let fixture: ComponentFixture<JobTypesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobTypesDialogComponent]
    });
    fixture = TestBed.createComponent(JobTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
