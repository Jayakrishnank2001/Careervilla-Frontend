import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerLoginLayoutComponent } from './employer-login-layout.component';

describe('EmployerLoginLayoutComponent', () => {
  let component: EmployerLoginLayoutComponent;
  let fixture: ComponentFixture<EmployerLoginLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerLoginLayoutComponent]
    });
    fixture = TestBed.createComponent(EmployerLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
