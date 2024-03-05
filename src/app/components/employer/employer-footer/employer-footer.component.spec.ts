import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerFooterComponent } from './employer-footer.component';

describe('EmployerFooterComponent', () => {
  let component: EmployerFooterComponent;
  let fixture: ComponentFixture<EmployerFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerFooterComponent]
    });
    fixture = TestBed.createComponent(EmployerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
