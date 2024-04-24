import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompany } from 'src/app/models/company';
import { IEmployerRes } from 'src/app/models/employer';
import { IJobRes } from 'src/app/models/job';
import { CompanyService } from 'src/app/services/company.service';
import { EmployerService } from 'src/app/services/employer.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobseeker-messages',
  templateUrl: './jobseeker-messages.component.html',
  styleUrls: ['./jobseeker-messages.component.css']
})
export class JobseekerMessagesComponent implements OnInit {

  jobId!: string | null
  job:IJobRes={}

  constructor(private _route: ActivatedRoute,
    private _jobService:JobService) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.jobId = params.get('jobId')
    })
    this.getJobDetails(this.jobId)
  }

  getJobDetails(jobId:string|null): void {
    if (jobId)
      this._jobService.getJobDetails(jobId).subscribe({
        next: (res) => {
          this.job = res
        }
      })
  }



}
