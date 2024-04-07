import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerManageCandidatesComponent } from './employer-manage-candidates.component';

describe('EmployerManageCandidatesComponent', () => {
  let component: EmployerManageCandidatesComponent;
  let fixture: ComponentFixture<EmployerManageCandidatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerManageCandidatesComponent]
    });
    fixture = TestBed.createComponent(EmployerManageCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
