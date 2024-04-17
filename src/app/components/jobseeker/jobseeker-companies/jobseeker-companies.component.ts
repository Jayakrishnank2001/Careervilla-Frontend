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
    this.companyService.getAllCompanies().subscribe({
      next: (res) => {
        this.companies = res
      }
    })
  }

  companyDetails(companyId: string | undefined): void {
    this.router.navigate(['/jobseeker/company'],{ queryParams: { companyId: companyId } })
  }





}
