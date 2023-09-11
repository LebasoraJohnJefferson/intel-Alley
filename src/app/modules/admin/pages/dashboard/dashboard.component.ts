import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { OverviewService } from '../../shared/services/overview.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profile: any = [];

  date: any;
  isMorning: any;
  isAfternoon: any;
  isEvening: any;
  isNight: any;
  name: string = 'Admin';
  overview:any;

  constructor(
    private _adminService: AdminService,
    private _overviewService:OverviewService
    ) {}

  getAdmin() {
    this.date = new Date();
    this._adminService.getAdmin().subscribe({
      next: (res) => {
        this.name = res.user.name;
      },
    });
  }

  getOverView(){
    this._overviewService.getAdminOverView().subscribe({
      next:(res)=>{
        this.overview =res
        console.log(res)
      }
    })
  }

  ngOnInit(): void {
    this.getAdmin();
    this.getOverView();
    this.isMorning = this.date.getHours() > 5 && this.date.getHours() <= 12;
    this.isAfternoon = this.date.getHours() > 12 && this.date.getHours() <= 18;
    this.isEvening = this.date.getHours() > 18 && this.date.getHours() <= 22;
    this.isNight = this.date.getHours() > 22 || this.date.getHours() <= 5;
  }
}
