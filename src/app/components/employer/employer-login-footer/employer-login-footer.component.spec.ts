import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerLoginFooterComponent } from './employer-login-footer.component';

describe('EmployerLoginFooterComponent', () => {
  let component: EmployerLoginFooterComponent;
  let fixture: ComponentFixture<EmployerLoginFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerLoginFooterComponent]
    });
    fixture = TestBed.createComponent(EmployerLoginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
