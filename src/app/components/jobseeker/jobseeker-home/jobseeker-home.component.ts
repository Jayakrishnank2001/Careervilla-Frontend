import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'app-jobseeker-home',
  templateUrl: './jobseeker-home.component.html',
  styleUrls: ['./jobseeker-home.component.css']
})
export class JobseekerHomeComponent {

  constructor(private breakpointObserver: BreakpointObserver) {}

isSmallScreen = this.breakpointObserver.observe('(max-width: 600px)').pipe(
  map(result => result.matches)
)
}
