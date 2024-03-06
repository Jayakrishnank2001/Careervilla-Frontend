import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent{
  screenSize: Observable<string>;

  isMenuOpen = true;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.screenSize = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(breakpointState => breakpointState.matches ? 'small' : 'large')
      );
  }

}