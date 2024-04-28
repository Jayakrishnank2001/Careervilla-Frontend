import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IIndustry } from 'src/app/models/industry';
import { IndustryService } from 'src/app/services/industry.service';

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
    @Inject(MatDialog) private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getIndustries()
  }

  getIndustries(): void {
    this._industryService.getAllIndustries(this.currPage, this.itemsPerPage, this.searchQuery).subscribe({
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

  





}
