import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillsDialogComponent } from './add-skills-dialog.component';

describe('AddSkillsDialogComponent', () => {
  let component: AddSkillsDialogComponent;
  let fixture: ComponentFixture<AddSkillsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSkillsDialogComponent]
    });
    fixture = TestBed.createComponent(AddSkillsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
