import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPostJobComponent } from './employer-post-job.component';

describe('EmployerPostJobComponent', () => {
  let component: EmployerPostJobComponent;
  let fixture: ComponentFixture<EmployerPostJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerPostJobComponent]
    });
    fixture = TestBed.createComponent(EmployerPostJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
