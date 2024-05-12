import { Component, Inject, OnInit } from '@angular/core';
import { scales } from 'chart.js';
import { IJobRes } from 'src/app/models/job';
import { AdminService } from 'src/app/services/admin.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent implements OnInit {

  chart1: any
  chart2: any
  chart3: any
  chartOptions1: any
  chartOptions2: any
  chartOptions3: any
  totalJobseekers: number = 0
  blockedJobseekers: number = 0
  nonBlockedJobseekers: number = 0
  totalEmployers: number = 0
  blockedEmployers: number = 0
  nonBlockedEmployers: number = 0

  constructor(
    @Inject(AdminService) private _adminService: AdminService,
    @Inject(JobService) private _jobService: JobService) { }

  ngOnInit(): void {
    this.getMonthlyJobs()
    this.getJobseekerData()
    this.getEmployerData()
  }

  getMonthlyJobs(): void{
    this._jobService.getJobs().subscribe({
      next: (res) => {
        const jobCounts=this.calculateJobsPerMonth(res)
        this.chart1 = {
          labels: ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [
            {
              label: 'Jobs Posted',
              data: jobCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
            },
          ],
        };
      }
    })
    this.chartOptions1 = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Jobs Posted Per Month',
          font: {
            size: 16,
          },
        },
      },
      scales: undefined
    };
  }

  getEmployerData(): void {
    this._adminService.getAllEmployers(1, 10, '').subscribe({
      next: (res) => {
        if (res.data !== null) {
          this.totalEmployers = res.data?.employersCount
          this.blockedEmployers = res.data.employers.filter((employer) => employer.isBlocked).length;
          this.nonBlockedEmployers = this.totalEmployers - this.blockedEmployers;
          this.chart2 = {
            labels: ['Total', 'Blocked', 'Non-Blocked'],
            datasets: [
              {
                data: [this.totalEmployers, this.blockedEmployers, this.nonBlockedEmployers],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
              },
            ],
          };
        }
      }
    })
    this.chartOptions2 = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Employers',
          font: {
            size: 16,
          },
        },
      },
      scales: undefined
    };
  }

  getJobseekerData(): void {
    this._adminService.getAllJobseekers(1, 10, '').subscribe({
      next: (res) => {
        if (res.data !== null) {
          this.totalJobseekers = res.data.jobseekersCount
          this.blockedJobseekers = res.data.jobseekers.filter((jobseeker) => jobseeker.isBlocked).length
          this.nonBlockedJobseekers = this.totalJobseekers - this.blockedJobseekers
          this.chart3 = {
            labels: ['Total', 'Blocked', 'Non-Blocked'],
            datasets: [
              {
                data: [this.totalJobseekers, this.blockedJobseekers, this.nonBlockedJobseekers],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
              },
            ],
          };
        }
      }
    })
    this.chartOptions3 = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Jobseekers',
          font: {
            size: 16,
          },
        },
      },
      scales: undefined
    };
  }

  calculateJobsPerMonth(Jobs: IJobRes[]): number[]{
    const jobCounts = new Array(12).fill(0);
    Jobs.forEach((job) => {
      if (job.postedAt) {
        const month = new Date(job.postedAt).getMonth();
        jobCounts[month] += 1;
      }
    })
    return jobCounts
  }




}
