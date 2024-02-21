import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobseekersComponent } from './admin-jobseekers.component';

describe('AdminJobseekersComponent', () => {
  let component: AdminJobseekersComponent;
  let fixture: ComponentFixture<AdminJobseekersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminJobseekersComponent]
    });
    fixture = TestBed.createComponent(AdminJobseekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
