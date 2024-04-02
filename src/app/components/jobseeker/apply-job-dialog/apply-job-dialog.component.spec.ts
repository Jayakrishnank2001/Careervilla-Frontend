import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobDialogComponent } from './apply-job-dialog.component';

describe('ApplyJobDialogComponent', () => {
  let component: ApplyJobDialogComponent;
  let fixture: ComponentFixture<ApplyJobDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyJobDialogComponent]
    });
    fixture = TestBed.createComponent(ApplyJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
