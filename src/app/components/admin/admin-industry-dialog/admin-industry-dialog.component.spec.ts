import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndustryDialogComponent } from './admin-industry-dialog.component';

describe('AdminIndustryDialogComponent', () => {
  let component: AdminIndustryDialogComponent;
  let fixture: ComponentFixture<AdminIndustryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIndustryDialogComponent]
    });
    fixture = TestBed.createComponent(AdminIndustryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
