import { Component, type OnInit } from '@angular/core';
import { type IJobseekerRes } from 'src/app/models/jobseeker';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-jobseekers',
  templateUrl: './admin-jobseekers.component.html',
  styleUrls: ['./admin-jobseekers.component.css']
})
export class AdminJobseekersComponent implements OnInit {
  jobseekers: IJobseekerRes[] = []
  currPage = 1
  itemsPerPage = 10
  searchQuery: string = ''
  jobseekersCount = 0

  constructor(private readonly adminService: AdminService) { }

  ngOnInit(): void {
    this.getJobseekers()
  }

  getJobseekers(): void {
    this.adminService.getAllJobseekers(this.currPage, this.itemsPerPage, this.searchQuery).subscribe({
      next: (res) => {
        if (res.data !== null) {
          this.jobseekers = res.data.jobseekers
          this.jobseekersCount=res.data.jobseekersCount
        }
      }
    })
  }

  onBlock(jobseekerId: string, action: 'Block' | 'Unblock'): void{
    void Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${action} this user!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText:'NO, cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.blockJobseeker(jobseekerId).subscribe({
          next: () => {
            this.ngOnInit()
          }
        })
      }
    })
  }

  onSearchJobseekers(searchQuery: string): void {
    this.searchQuery = searchQuery
    this.getJobseekers()
  }

  onPageChange(page: number): void {
    this.currPage = page
    this.getJobseekers()
  }

  onItemsPerPageChange(itemsPerPage: number): void{
    this.itemsPerPage = itemsPerPage
    this.currPage = 1
    this.getJobseekers()
  }



}
