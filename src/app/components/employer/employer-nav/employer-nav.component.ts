import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-employer-nav',
  templateUrl: './employer-nav.component.html',
  styleUrls: ['./employer-nav.component.css']
})
export class EmployerNavComponent implements OnInit{
  
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
