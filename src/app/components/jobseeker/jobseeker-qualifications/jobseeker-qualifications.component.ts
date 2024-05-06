import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecentWorkDialogComponent } from '../recent-work-dialog/recent-work-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { IJobseekerRes } from 'src/app/models/jobseeker';
import { HighestEducationDialogComponent } from '../highest-education-dialog/highest-education-dialog.component';
import { AddSkillsDialogComponent } from '../add-skills-dialog/add-skills-dialog.component';
import { AddLanguagesDialogComponent } from '../add-languages-dialog/add-languages-dialog.component';

@Component({
  selector: 'app-jobseeker-qualifications',
  templateUrl: './jobseeker-qualifications.component.html',
  styleUrls: ['./jobseeker-qualifications.component.css']
})
export class JobseekerQualificationsComponent implements OnInit {

  jobseeker: IJobseekerRes = {}

  constructor(
    @Inject(MatDialog) private _dialog: MatDialog,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService) { }

  ngOnInit(): void {
    this.getJobseekerDetails()
  }

  getJobseekerDetails(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId)
      this._jobseekerService.getJobseekerDetails(jobseekerId).subscribe({
        next: (res) => {
          this.jobseeker = res
        }
      })
  }

  addRecentWork(): void {
    const dialogRef = this._dialog.open(RecentWorkDialogComponent, {
      data: { work: this.jobseeker.qualifications?.recentExperience }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getJobseekerDetails()
    })
  }

  addHighestEducation(): void {
    const dialogRef = this._dialog.open(HighestEducationDialogComponent, {
      data: { education: this.jobseeker.qualifications?.highestEducation }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getJobseekerDetails()
    })
  }

  addSkills(): void {
    const dialogRef = this._dialog.open(AddSkillsDialogComponent, {
      data: { skills: this.jobseeker.qualifications?.skills }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getJobseekerDetails()
    })
  }

  addLanguages(): void {
    const dialogRef = this._dialog.open(AddLanguagesDialogComponent, {
      data: { languages: this.jobseeker.qualifications?.languages }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getJobseekerDetails()
    })
  }






}
