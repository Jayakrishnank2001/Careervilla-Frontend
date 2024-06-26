import { Component, OnInit } from '@angular/core';
import { IEmployerRes } from 'src/app/models/employer';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-employers',
  templateUrl: './admin-employers.component.html',
  styleUrls: ['./admin-employers.component.css'],
})
export class AdminEmployersComponent implements OnInit {
  employers: IEmployerRes[] = []
  currPage = 1
  itemsPerPage = 6
  searchQuery: string = ''
  employersCount = 0

  constructor(private readonly _adminService: AdminService) { }

  ngOnInit(): void {
    this.getEmployers()
  }

  getEmployers(): void {
    this._adminService.getAllEmployers(this.currPage, this.itemsPerPage, this.searchQuery).subscribe({
      next: (res) => {
        if (res.data !== null) {
          this.employers = res.data.employers
          this.employersCount = res.data.employersCount
        }
      }
    })
  }

  
  onBlock(employerId: string, action: 'Block' | 'Unblock'): void {
    void Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${action} this user!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: 'NO, cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this._adminService.blockEmployer(employerId).subscribe({
          next: () => {
            this.ngOnInit()
          }
        })
      }
    })
  }

  onSearchEmployers(searchQuery: string): void{
    this.searchQuery = searchQuery
    this.getEmployers()
  }

  onPageChange(page: number): void{
    this.currPage = page
    this.getEmployers()
  }

  onItemsPerPageChange(itemsPerPage: number): void{
    this.itemsPerPage = itemsPerPage
    this.currPage = 1
    this.getEmployers()
  }






}
