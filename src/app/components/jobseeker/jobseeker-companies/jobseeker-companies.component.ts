import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-jobseeker-companies',
  templateUrl: './jobseeker-companies.component.html',
  styleUrls: ['./jobseeker-companies.component.css']
})
export class JobseekerCompaniesComponent implements OnInit {

  companies: ICompany[] = []
  page: number = 1;
  pageSize: number = 3;
  hasMoreCompanies: boolean = true;
  searchQuery: string = ''

  constructor(private breakpointObserver: BreakpointObserver,
    private companyService: CompanyService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCompanies()
  }

  isSmallScreen = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  getCompanies(): void {
    this.companyService.getAllCompanies(this.page, this.pageSize, this.searchQuery).subscribe({
      next: (res) => {
        if (this.searchQuery==='') {
          this.companies = [...this.companies,...res]
        } else {
          this.companies=[...res]
        }
        if (res.length < this.pageSize) {
          this.hasMoreCompanies = false;
        } else {
          this.hasMoreCompanies = true;
        }
      }
    })
  }

  onScrollDown(): void {
    if (this.hasMoreCompanies) {
      this.page += 1;
      this.getCompanies();
    }
  }

  companyDetails(companyId: string | undefined): void {
    this.router.navigate(['/jobseeker/company'], { queryParams: { companyId: companyId } })
  }

  onSearch(): void {
    this.page=1
    this.getCompanies()
  }





}
