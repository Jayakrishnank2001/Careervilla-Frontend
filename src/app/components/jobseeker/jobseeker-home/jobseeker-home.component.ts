import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { JobSearchQuery } from 'src/app/models/job';

@Component({
  selector: 'app-jobseeker-home',
  templateUrl: './jobseeker-home.component.html',
  styleUrls: ['./jobseeker-home.component.css']
})
export class JobseekerHomeComponent {

  searchQuery: JobSearchQuery = {
    jobTitle: '',
    location: '',
    experience:''
  }

  constructor(private _breakpointObserver: BreakpointObserver,
    private _router: Router) { }

  isSmallScreen = this._breakpointObserver.observe('(max-width: 600px)').pipe(
    map(result => result.matches)
  )

  searchJobs(): void {
    this._router.navigate(['/jobseeker/jobs'], { queryParams: this.searchQuery })
  }

}
