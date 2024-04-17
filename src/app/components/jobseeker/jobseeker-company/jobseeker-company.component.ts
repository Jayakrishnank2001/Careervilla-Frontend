import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-jobseeker-company',
  templateUrl: './jobseeker-company.component.html',
  styleUrls: ['./jobseeker-company.component.css']
})
export class JobseekerCompanyComponent implements OnInit {

  companyId!: string
  company!:ICompany

  constructor(private route: ActivatedRoute,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyId = params['companyId'];
      this.companyService.getCompanyDetails(this.companyId).subscribe({
        next: (res) => {
          this.company = res
        }
      })
    });
  }

}
