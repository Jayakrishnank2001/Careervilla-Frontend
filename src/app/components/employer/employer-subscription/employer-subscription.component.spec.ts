import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSubscriptionComponent } from './employer-subscription.component';

describe('EmployerSubscriptionComponent', () => {
  let component: EmployerSubscriptionComponent;
  let fixture: ComponentFixture<EmployerSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerSubscriptionComponent]
    });
    fixture = TestBed.createComponent(EmployerSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
