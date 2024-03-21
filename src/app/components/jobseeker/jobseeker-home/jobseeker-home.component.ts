import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-jobseeker-home',
  templateUrl: './jobseeker-home.component.html',
  styleUrls: ['./jobseeker-home.component.css']
})
export class JobseekerHomeComponent implements OnInit{

  constructor(private breakpointObserver: BreakpointObserver) { }
  
  ngOnInit(): void {
  }

isSmallScreen = this.breakpointObserver.observe('(max-width: 600px)').pipe(
  map(result => result.matches)
)
}
