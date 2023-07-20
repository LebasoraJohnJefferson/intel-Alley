import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profile: any = [];
  name:string = 'Alumnus'
  date: any;
  greetingState:number = 0
  greeting:Array<string>=[
    'Morning',
    'Afternoon',
    'Evening',
    'Night'
  ]
  constructor(
    public router:Router,
    private _userService:UsersService,
    public toast:HotToastService,
  ) {}

  getUser(){
    this._userService.getUser().subscribe({
      next:(res)=>{
        this.name = res.user.name
      },error:(err)=>{
        this.router.navigate(['login'])
        localStorage.removeItem('token')
        this.toast.warning("Forbidden")
      }
    })
  }

  ngOnInit(): void {
    this.getUser()
    this.date = new Date();

    if(this.date.getHours() > 5 && this.date.getHours() <= 12) this.greetingState = 0
    else if(this.date.getHours() > 12 && this.date.getHours() <= 18) this.greetingState = 1
    else if(this.date.getHours() > 18 && this.date.getHours() <= 22) this.greetingState =2
    else this.greetingState =3
    // this.isNight = this.date.getHours() > 22 || this.date.getHours() <= 5;
  }
}