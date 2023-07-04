import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  isLoading:boolean =false

  passwordForm:FormGroup = this._fb.group({
    password:['',Validators.required],
    confirmPassword:['',Validators.required],
  })

  constructor(
    private _fb:FormBuilder,
    public location:Location
  ){

  }

  goBack(){
    this.location.back()
  }


  clickSubmit(event:boolean){
    this.isLoading = !event
    if(this.passwordForm.invalid){
      alert('Empty Input(s)')
    }else if(this.passwordForm.controls['password'].value !=this.passwordForm.controls['confirmPassword']){
      alert('password does`nt match')
    }
  }
}
