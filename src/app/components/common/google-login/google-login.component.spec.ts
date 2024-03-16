import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLoginComponent } from './google-login.component';

describe('GoogleLoginComponent', () => {
  let component: GoogleLoginComponent;
  let fixture: ComponentFixture<GoogleLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleLoginComponent]
    });
    fixture = TestBed.createComponent(GoogleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
