import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-jobseeker-my-jobs',
  templateUrl: './jobseeker-my-jobs.component.html',
  styleUrls: ['./jobseeker-my-jobs.component.css']
})
export class JobseekerMyJobsComponent implements OnInit{

  savedJobs: (string | undefined)[] = []
  appliedJobs: (string | undefined)[] = []
  jobseekerId!: string | null
  
  constructor(private jobseekerService: JobseekerService,
  private authService:AuthService) { }
  
  ngOnInit(): void {
    this.jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')
    this.getJobs(this.jobseekerId)
  }

  getJobs(jobseekerId: string | null): void{
    if (jobseekerId) {
      this.jobseekerService.getJobseekerDetails(jobseekerId).subscribe({
        next: (res) => {
          console.log(res)
          this.savedJobs = res?.savedJobs?.map(job => job.jobId) || [];
          this.appliedJobs = res?.appliedJobs?.map(job => job.jobId) || []
        }
      })
    }
  }

}
