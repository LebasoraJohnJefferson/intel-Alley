import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  isLoading:boolean = false
  token:string = ''

  emailForm:FormGroup = this._fb.group({
    email:['',[Validators.required,Validators.email]]
  })



  constructor(
    public location:Location,
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _authService:AuthService
    ){
      
  }

  goBack(){
    this.location.back()
  }

  clickSubmit(event:boolean){
    this.isLoading = !event
    if(this.emailForm.valid){
      this._authService.forgotpassword(this.emailForm.value).subscribe((res:any)=>{
        this.toast.success(res.message)
        this.emailForm.reset()
        this.isLoading = false
      },(err:any)=>{
        this.toast.warning(err.error)
        this.isLoading = false
      })
    }else{
      this.toast.warning('Email is required!')
      this.isLoading = false
    }
  }
}
