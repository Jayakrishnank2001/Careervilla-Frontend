import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayDialogComponent } from './add-pay-dialog.component';

describe('AddPayDialogComponent', () => {
  let component: AddPayDialogComponent;
  let fixture: ComponentFixture<AddPayDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPayDialogComponent]
    });
    fixture = TestBed.createComponent(AddPayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
