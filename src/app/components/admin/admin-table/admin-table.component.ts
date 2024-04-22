import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatIconModule, MatButtonModule],
})
export class AdminTableComponent implements OnInit {

  @Output() search = new EventEmitter<string>()
  @Output() pageChange = new EventEmitter<number>()
  @Output() itemsPerPageChange = new EventEmitter<number>()

  searchForm!: FormGroup
  currentPage = 1
  itemsPerPage = 10
  @Input() totalItems: number = 0
  @Input() searchField = true
  totalPages = 1
  dynamicPages: number[] = [1, 2, 3]

  constructor(private readonly _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      searchQuery: ['']
    })
  }

  getTotalPage(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }

  onPageChange(page: number): void {
    this.currentPage = page
    this.calculateDynamicPages(page)
    this.pageChange.emit(page)
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage
    this.currentPage = 1
    this.itemsPerPageChange.emit(itemsPerPage)
  }

  onSearch(): void {
    if (this.searchField) {
      const searchQuery = this.searchForm.get('searchQuery')?.value
      this.search.emit(searchQuery)
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.getTotalPage() }, (_, index) => index + 1)
  }

  calculateDynamicPages(currentPage: number): void {
    const maxVisiblePages = 3
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(this.getTotalPage(), startPage + maxVisiblePages - 1)
    this.dynamicPages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
  }





}
