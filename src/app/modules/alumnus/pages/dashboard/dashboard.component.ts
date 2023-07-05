import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profile: any = [];

  date: any;
  greetingState:number = 0
  greeting:Array<string>=[
    'Morning',
    'Afternoon',
    'Evening',
    'Night'
  ]
  constructor(
  ) {}

  ngOnInit(): void {
    this.date = new Date();

    if(this.date.getHours() > 5 && this.date.getHours() <= 12) this.greetingState = 0
    else if(this.date.getHours() > 12 && this.date.getHours() <= 18) this.greetingState = 1
    else if(this.date.getHours() > 18 && this.date.getHours() <= 22) this.greetingState =2
    else this.greetingState =3
    // this.isNight = this.date.getHours() > 22 || this.date.getHours() <= 5;
  }
}