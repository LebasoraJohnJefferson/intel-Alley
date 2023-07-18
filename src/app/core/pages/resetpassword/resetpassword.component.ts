import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  isLoading:boolean =false
  token:any;
  passwordForm:FormGroup = this._fb.group({
    password:['',Validators.required],
    confirmPassword:['',Validators.required],
  })

  constructor(
    private _fb:FormBuilder,
    public location:Location,
    public toast:HotToastService,
    private _route:ActivatedRoute,
    private _authService:AuthService
  ){
    this._route.queryParams.subscribe((value) => {
      this.token = this._route.snapshot.paramMap.get('token');
    });
  }

  goBack(){
    this.location.back()
  }


  clickSubmit(event:boolean){
    console.log(event)
    this.isLoading = !event
    if(this.passwordForm.invalid){
      this.toast.warning('Empty Input(s)')
      this.isLoading = false
    }else if(this.passwordForm.controls['password'].value !=this.passwordForm.controls['confirmPassword'].value){
      this.toast.warning('password does`nt match')
      this.isLoading = false
    }else{
      this._authService.resetPassword(this.passwordForm.value,this.token).subscribe({
        complete:()=>{
          this.isLoading = false
        },
        error:(err)=>{
          console.log(err)
          this.toast.warning(err.error)
        },next:(res)=>{
          this.toast.success(res.message)
          this.passwordForm.reset()
        }
      })
    }
  }
}

