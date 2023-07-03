import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  constructor(public location:Location){

  }

  goBack(){
    this.location.back()
  }
}
