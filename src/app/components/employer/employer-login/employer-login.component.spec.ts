import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerLoginComponent } from './employer-login.component';

describe('EmployerLoginComponent', () => {
  let component: EmployerLoginComponent;
  let fixture: ComponentFixture<EmployerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerLoginComponent]
    });
    fixture = TestBed.createComponent(EmployerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
