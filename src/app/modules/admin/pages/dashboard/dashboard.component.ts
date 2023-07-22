import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

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

  constructor(private _adminService: AdminService) {}

  getAdmin() {
    this.date = new Date();
    this._adminService.getAdmin().subscribe({
      next: (res) => {
        this.name = res.user.name;
      },
    });
  }

  ngOnInit(): void {
    this.getAdmin();
    this.isMorning = this.date.getHours() > 5 && this.date.getHours() <= 12;
    this.isAfternoon = this.date.getHours() > 12 && this.date.getHours() <= 18;
    this.isEvening = this.date.getHours() > 18 && this.date.getHours() <= 22;
    this.isNight = this.date.getHours() > 22 || this.date.getHours() <= 5;
  }
}
