import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobDialogComponent } from './edit-job-dialog.component';

describe('EditJobDialogComponent', () => {
  let component: EditJobDialogComponent;
  let fixture: ComponentFixture<EditJobDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditJobDialogComponent]
    });
    fixture = TestBed.createComponent(EditJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
