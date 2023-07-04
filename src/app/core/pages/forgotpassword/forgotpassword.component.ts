import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  isLoading:boolean = true
  constructor(public location:Location){

  }

  goBack(){
    this.location.back()
  }

  clickSubmit(event:boolean){
    this.isLoading = !this.isLoading
  }
}
