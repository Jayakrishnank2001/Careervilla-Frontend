import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestEducationDialogComponent } from './highest-education-dialog.component';

describe('HighestEducationDialogComponent', () => {
  let component: HighestEducationDialogComponent;
  let fixture: ComponentFixture<HighestEducationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighestEducationDialogComponent]
    });
    fixture = TestBed.createComponent(HighestEducationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
