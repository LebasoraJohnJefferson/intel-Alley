import { Component, OnInit } from '@angular/core';

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

  constructor(
  ) {}

  ngOnInit(): void {
    this.date = new Date();

    this.isMorning = this.date.getHours() > 5 && this.date.getHours() <= 12;
    this.isAfternoon = this.date.getHours() > 12 && this.date.getHours() <= 18;
    this.isEvening = this.date.getHours() > 18 && this.date.getHours() <= 22;
    this.isNight = this.date.getHours() > 22 || this.date.getHours() <= 5;
  }
}