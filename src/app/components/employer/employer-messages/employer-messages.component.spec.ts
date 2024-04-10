import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerMessagesComponent } from './employer-messages.component';

describe('EmployerMessagesComponent', () => {
  let component: EmployerMessagesComponent;
  let fixture: ComponentFixture<EmployerMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerMessagesComponent]
    });
    fixture = TestBed.createComponent(EmployerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
