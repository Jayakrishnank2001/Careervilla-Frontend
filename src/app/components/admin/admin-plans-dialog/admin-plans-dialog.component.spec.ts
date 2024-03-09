import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlansDialogComponent } from './admin-plans-dialog.component';

describe('AdminPlansDialogComponent', () => {
  let component: AdminPlansDialogComponent;
  let fixture: ComponentFixture<AdminPlansDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPlansDialogComponent]
    });
    fixture = TestBed.createComponent(AdminPlansDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
