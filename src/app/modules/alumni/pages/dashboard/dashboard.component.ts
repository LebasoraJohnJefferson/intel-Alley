import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumniService } from '../../shared/services/alumni.service';
import { HotToastService } from '@ngneat/hot-toast';
import { OverviewService } from '../../shared/services/overview.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profile: any = [];
  name: string = 'Alumnus';
  date: any;
  female:number =0
  male:number = 0
  eventCount:number =0
  greetingState: number = 0;
  greeting: Array<string> = ['Morning', 'Afternoon', 'Evening', 'Night'];
  constructor(
    public router: Router,
    private alumniService: AlumniService,
    public toast: HotToastService,
    private _overviewService:OverviewService
  ) {
  }

  getUser() {
    this.alumniService.getProfile().subscribe({
      next: (res: any) => {
        this.name = res.user.name;
      },
    });
  }


  getOverView(){
    this._overviewService.getOverVIew().subscribe({
      next:(res)=>{
        this.female = res?.gender?.female || 0
        this.male = res?.gender?.male || 0
        this.eventCount = res.eventCount
      },
    })
  }

  ngOnInit(): void {
    this.getUser();
    this.getOverView()
    this.date = new Date();

    if (this.date.getHours() > 5 && this.date.getHours() <= 12)
      this.greetingState = 0;
    else if (this.date.getHours() > 12 && this.date.getHours() <= 18)
      this.greetingState = 1;
    else if (this.date.getHours() > 18 && this.date.getHours() <= 22)
      this.greetingState = 2;
    else this.greetingState = 3;
  }
}
