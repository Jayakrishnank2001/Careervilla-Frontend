import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-employer-post-job',
  templateUrl: './employer-post-job.component.html',
  styleUrls: ['./employer-post-job.component.css']
})
export class EmployerPostJobComponent {

  constructor(private breakpointObserver: BreakpointObserver) {}

  isSmallScreen = this.breakpointObserver.observe('(max-width: 600px)').pipe(
    map(result => result.matches)
  );

  
}
