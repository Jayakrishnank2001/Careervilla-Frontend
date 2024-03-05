import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-jobseeker-nav',
  templateUrl: './jobseeker-nav.component.html',
  styleUrls: ['./jobseeker-nav.component.css']
})
export class JobseekerNavComponent {

  screenSize: Observable<string>;

  isMenuOpen = true;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.screenSize = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(breakpointState => breakpointState.matches ? 'small' : 'large')
      );
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
