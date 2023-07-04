import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  isLoading:boolean = false

  emailForm:FormGroup = this._fb.group({
    email:['',[Validators.required,Validators.email]]
  })



  constructor(
    public location:Location,
    private _fb:FormBuilder
    ){

  }

  goBack(){
    this.location.back()
  }

  clickSubmit(event:boolean){
    this.isLoading = !event
    if(this.emailForm.invalid){
      alert('Invalid Email')
    }
  }
}
