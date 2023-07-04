import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';


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
    private _fb:FormBuilder,
    public toast:HotToastService
    ){

  }

  goBack(){
    this.location.back()
  }

  clickSubmit(event:boolean){
    this.isLoading = !event
    if(this.emailForm.invalid){
      this.toast.warning('Invalid Email')
    }
  }
}
