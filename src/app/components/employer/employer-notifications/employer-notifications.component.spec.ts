import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerNotificationsComponent } from './employer-notifications.component';

describe('EmployerNotificationsComponent', () => {
  let component: EmployerNotificationsComponent;
  let fixture: ComponentFixture<EmployerNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerNotificationsComponent]
    });
    fixture = TestBed.createComponent(EmployerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
