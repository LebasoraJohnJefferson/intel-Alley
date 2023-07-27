import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumniService } from '../../shared/services/alumni.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profile: any = [];
  name: string = 'Alumnus';
  date: any;
  greetingState: number = 0;
  greeting: Array<string> = ['Morning', 'Afternoon', 'Evening', 'Night'];
  constructor(
    public router: Router,
    private alumniService: AlumniService,
    public toast: HotToastService
  ) {}

  getUser() {
    this.alumniService.getProfile().subscribe({
      next: (res: any) => {
        this.name = res.user.name;
      },
    });
  }

  ngOnInit(): void {
    this.getUser();
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
