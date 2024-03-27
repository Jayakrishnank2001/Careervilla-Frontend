import { Component, OnInit } from '@angular/core';
import { IJobseekerRes } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-jobseeker-profile',
  templateUrl: './jobseeker-profile.component.html',
  styleUrls: ['./jobseeker-profile.component.css']
})
export class JobseekerProfileComponent implements OnInit {

  userData: IJobseekerRes = {}

  constructor(private authService: AuthService,
    private jobseekerService: JobseekerService) { }

  ngOnInit(): void {
    this.jobseekerProfile()
  }

  jobseekerProfile(): void {
    const jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId)
      this.jobseekerService.getJobseekerDetails(jobseekerId).subscribe({
        next: (res) => {
          this.userData = res
        }
      })
  }

}
