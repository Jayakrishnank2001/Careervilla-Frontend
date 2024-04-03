import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IReportedJob } from 'src/app/models/reportedJob';
import { ReportedJobService } from 'src/app/services/reported-job.service';

@Component({
  selector: 'app-admin-reported-dialog',
  templateUrl: './admin-reported-dialog.component.html',
  styleUrls: ['./admin-reported-dialog.component.css']
})
export class AdminReportedDialogComponent implements OnInit {

  job: IReportedJob={}

  constructor(private dialogRef: MatDialogRef<AdminReportedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: string },
    private reportJobService: ReportedJobService) { }

  ngOnInit(): void {
    this.reportJobService.reportedJobDetails(this.data.jobId).subscribe({
      next: (res) => {
        this.job = res
      }
    })
  }


}
