import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IIndustry } from 'src/app/models/industry';
import { IndustryService } from 'src/app/services/industry.service';
import { AdminIndustryDialogComponent } from '../admin-industry-dialog/admin-industry-dialog.component';
import { IRes } from 'src/app/models/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-industries',
  templateUrl: './admin-industries.component.html',
  styleUrls: ['./admin-industries.component.css']
})
export class AdminIndustriesComponent implements OnInit {

  industries: IIndustry[] = []
  currPage = 1
  itemsPerPage = 5
  searchQuery: string = ''
  industriesCount = 0

  constructor(
    @Inject(IndustryService) private _industryService: IndustryService,
    @Inject(MatDialog) private _dialog: MatDialog,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getIndustries()
  }

  getIndustries(): void {
    this._industryService.getAllIndustries('admin',this.currPage, this.itemsPerPage, this.searchQuery).subscribe({
      next: (res) => {
        if (res.data !== null) {
          this.industries = res.data.industries
          this.industriesCount = res.data.industriesCount
        }
      }
    })
  }

  onSearchIndustry(searchQuery: string): void {
    this.searchQuery = searchQuery
    this.getIndustries()
  }

  onPageChange(page: number): void {
    this.currPage = page
    this.getIndustries()
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage
    this.currPage = 1
    this.getIndustries()
  }

  addNewIndustry(): void {
    this.openDialog(false)
  }

  editIndustry(industryId: string): void {
    this.openDialog(true, industryId)
  }

  openDialog(editMode: boolean, industryId?: string): void {
    const dialogRef = this._dialog.open(AdminIndustryDialogComponent, {
      data: { editMode, industryId, industries: this.industries }
    })
    dialogRef.afterClosed().subscribe((result: IIndustry) => {
      if (result) {
        if (!editMode) {
          this._industryService.addIndustry(result).subscribe({
            next: (res: IRes) => {
              this.getIndustries()
              if (res.data.message == 'Industry added successfully') {
                this._snackBar.open('New Industry added', 'Close', {
                  duration: 5000,
                  verticalPosition: 'top'
                })
              } else {
                this._snackBar.open('Industry already exists', 'Close', {
                  duration: 5000,
                  verticalPosition: 'top'
                })
              }
            }
          })
        } else if (industryId !== undefined) {
          this._industryService.editIndustry(industryId, result).subscribe({
            next: (res: IRes) => {
              this.getIndustries()
              if (res.data.message == 'Industry updated successfully') {
                this._snackBar.open('Industry updated successfully', 'Close', {
                  duration: 5000,
                  verticalPosition: 'top'
                })
              }
            }
          })
        }
      }
    })
  }

  deleteIndustry(industryId: string): void {
    void Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Industry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this._industryService.deleteIndustry(industryId).subscribe({
          next: () => {
            this.ngOnInit()
            this._snackBar.open('Industry deleted successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
          }
        })
      }
    })
  }







}
