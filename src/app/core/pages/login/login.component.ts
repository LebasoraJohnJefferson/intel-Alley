import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginAcctType: string = '';
  loginForm!: FormGroup;
  submitLoading: boolean = false;

  constructor(
    public router: Router,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.route.queryParams.subscribe((value) => {
      this.loginAcctType = value['type'];
    });
  }

  changeLoginAcctType(type: string) {
    this.loginAcctType = type;

    this.router.navigate(['/login'], {
      queryParams: { type: type },
    });
  }

  onSubmit() {
    let validParams = ['alumni', 'admin'];
    if (!validParams.includes(this.loginAcctType))
      return this.toast.warning('Select a category!');
    if (
      this.loginForm.status == 'VALID' &&
      this.loginForm.controls['password'].value.trim()
    ) {
      this.submitLoading = true;

      this.authService
        .login(this.loginAcctType, this.loginForm.value)
        .subscribe(
          (response: any) => {
            this.submitLoading = false;
            this.authService.setSession(
              this.loginAcctType,
              response.accessToken
            );
            this.toast.success(response.message);
            this.loginForm.reset();
          },
          (error: any) => {
            this.submitLoading = false;
            let result: any;
            if (error.status == 0) {
              result = 'Server has fallen!';
            } else if (error.status == 401 || error.status == 404) {
              result = error.error.message
                ? error.error.message
                : (result = error.error);
            } else if (error.status == 422) {
              result = error.error.email[0];
            } else if (error.status == 500) {
              result = error.statusText;
            }

            this.toast.error(result);
          }
        );
    } else {
      this.toast.error('Invalid Email or Password');
    }
  }
}
