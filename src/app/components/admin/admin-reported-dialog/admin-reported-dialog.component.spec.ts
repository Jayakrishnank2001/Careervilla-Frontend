import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportedDialogComponent } from './admin-reported-dialog.component';

describe('AdminReportedDialogComponent', () => {
  let component: AdminReportedDialogComponent;
  let fixture: ComponentFixture<AdminReportedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportedDialogComponent]
    });
    fixture = TestBed.createComponent(AdminReportedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
