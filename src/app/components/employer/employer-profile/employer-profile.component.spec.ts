import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerProfileComponent } from './employer-profile.component';

describe('EmployerProfileComponent', () => {
  let component: EmployerProfileComponent;
  let fixture: ComponentFixture<EmployerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerProfileComponent]
    });
    fixture = TestBed.createComponent(EmployerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
