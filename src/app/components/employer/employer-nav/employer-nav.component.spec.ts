import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerNavComponent } from './employer-nav.component';

describe('EmployerNavComponent', () => {
  let component: EmployerNavComponent;
  let fixture: ComponentFixture<EmployerNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerNavComponent]
    });
    fixture = TestBed.createComponent(EmployerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
