import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentWorkDialogComponent } from './recent-work-dialog.component';

describe('RecentWorkDialogComponent', () => {
  let component: RecentWorkDialogComponent;
  let fixture: ComponentFixture<RecentWorkDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentWorkDialogComponent]
    });
    fixture = TestBed.createComponent(RecentWorkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
