import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { IJobRes } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobseeker-jobs',
  templateUrl: './jobseeker-jobs.component.html',
  styleUrls: ['./jobseeker-jobs.component.css']
})
export class JobseekerJobsComponent {

  jobs!:IJobRes

  constructor(private breakpointObserver: BreakpointObserver,
    private jobService: JobService) { }

  ngOnInit(): void {
    this.getJobs()
  }

  isSmallScreen = this.breakpointObserver.observe('(max-width: 600px)').pipe(
    map(result => result.matches)
  )

  getJobs(): void{
    this.jobService.getJobs().subscribe({
      next: () => {
        
      }
    })
  }





}
