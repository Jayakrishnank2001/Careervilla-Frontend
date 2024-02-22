import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSignupComponent } from './employer-signup.component';

describe('EmployerSignupComponent', () => {
  let component: EmployerSignupComponent;
  let fixture: ComponentFixture<EmployerSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerSignupComponent]
    });
    fixture = TestBed.createComponent(EmployerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
