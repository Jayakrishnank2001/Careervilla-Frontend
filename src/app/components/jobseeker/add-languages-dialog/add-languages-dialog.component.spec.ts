import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanguagesDialogComponent } from './add-languages-dialog.component';

describe('AddLanguagesDialogComponent', () => {
  let component: AddLanguagesDialogComponent;
  let fixture: ComponentFixture<AddLanguagesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLanguagesDialogComponent]
    });
    fixture = TestBed.createComponent(AddLanguagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
