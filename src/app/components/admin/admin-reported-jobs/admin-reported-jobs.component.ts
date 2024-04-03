import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IReportedJob } from 'src/app/models/reportedJob';
import { ReportedJobService } from 'src/app/services/reported-job.service';
import Swal from 'sweetalert2';
import { AdminReportedDialogComponent } from '../admin-reported-dialog/admin-reported-dialog.component';

@Component({
  selector: 'app-admin-reported-jobs',
  templateUrl: './admin-reported-jobs.component.html',
  styleUrls: ['./admin-reported-jobs.component.css']
})
export class AdminReportedJobsComponent implements OnInit {

  reportedJobs: IReportedJob[] = []
  currPage = 1
  itemsPerPage = 10
  searchQuery: string = ''
  reportedJobCount = 0

  constructor(private reportedJobService: ReportedJobService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getReportedJobs()
  }

  getReportedJobs(): void {
    this.reportedJobService.getAllReportedJobs(this.currPage, this.itemsPerPage, this.searchQuery).subscribe({
      next: (res) => {
        if (res.data !== null) {
          this.reportedJobs = res.data.reportedJobs
          this.reportedJobCount = res.data.reportedJobsCount
          console.log(this.reportedJobs, this.reportedJobCount)
        }
      }
    })
  }

  onSearchReportedJob(searchQuery: string): void {
    this.searchQuery = searchQuery
    this.getReportedJobs()
  }

  onPageChange(page: number): void {
    this.currPage = page
    this.getReportedJobs()
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage
    this.currPage = 1
    this.getReportedJobs()
  }

  onBlock(jobId: string, reportJobId: string, action: 'Block' | 'Unblock'): void {
    void Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${action} this Job !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: 'NO, cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.reportedJobService.blockReportedJob(jobId, reportJobId).subscribe({
          next: (res) => {
            if (res.success == true) {
              this.ngOnInit()
            }
          }
        })
      }
    })
  }
  
  viewJob(jobId:string): void {
    this.openDialog(jobId)
  }

  openDialog(jobId: string): void{
    const dialogRef = this.dialog.open(AdminReportedDialogComponent, {
      data:{jobId}
    })
  }



}
