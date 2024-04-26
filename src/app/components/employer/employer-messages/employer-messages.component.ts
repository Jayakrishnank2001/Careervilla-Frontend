import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employer-messages',
  templateUrl: './employer-messages.component.html',
  styleUrls: ['./employer-messages.component.css']
})
export class EmployerMessagesComponent implements OnInit{

  jobseekerId!:string|null

  constructor(private _route:ActivatedRoute) { }
  
  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.jobseekerId = params.get('jobseekerId')
    })
  }

  



}
