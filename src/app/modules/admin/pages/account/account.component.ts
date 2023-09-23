import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HotToastService } from '@ngneat/hot-toast';

import { AuthService } from 'src/app/core/shared/services/auth.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  profile: any = [];
  editModal: boolean = false;
  submitLoading: boolean = false;
  courses: any;
  defaultImg: any = '../../../../../assets/images/admin.png';
  defaultImgAlumni: any = '../../../../../assets/images/student.png';
  previewImg: any = '';
  feedbacks:any= []
  isLoading: boolean = true;

  modalData: any = [];

  changePassData: any = {
    oldpass: null,
    newpass: null,
  };

  changePasswordModal: boolean = false;

  constructor(
    private toast: HotToastService,
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  logout() {
    this.authService.logout('admin');
  }

  changePassOnsubmit() {
    if (
      this.changePassData.oldpass == null ||
      this.changePassData.oldpass == ''
    ) {
      return this.toast.info('Old password is required.');
    }

    if (
      this.changePassData.newpass == null ||
      this.changePassData.newpass == ''
    ) {
      return this.toast.info('New password is required.');
    }

    this.submitLoading = true;

    const data = {
      id: this.profile.id,
      oldpass: this.changePassData.oldpass,
      newpass: this.changePassData.newpass,
    };

    this.adminService.changePassword(data).subscribe(
      (response: any) => {
        this.toast.success(response.message);

        this.submitLoading = false;

        this.changePassData = {
          id: this.profile.id,
          oldpass: null,
          newpass: null,
        };

        this.changePasswordModal = false;
      },
      (error: any) => {
        this.toast.error(error.error.message);

        this.submitLoading = false;
      }
    );
  }

  onSubmit() {
    if (this.modalData.name == '') {
      return this.toast.info('Name is required.');
    }

    if (this.modalData.email == '') {
      return this.toast.info('Email is required.');
    }

    this.submitLoading = true;

    this.adminService
      .updateProfile({
        name: this.modalData.name,
        email: this.modalData.email,
        image: this.modalData.image,
      })
      .subscribe(
        (response: any) => {
          this.toast.success(response.message);
          this.submitLoading = false;
          this.getProfile();
          this.editModal = false;
        },
        (error: any) => {
          console.log(error);
          this.toast.error(error.error.message);
          this.submitLoading = false;
        }
      );
  }

  loadInputImgToSrc(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.previewImg = reader.result;
      this.modalData.image = reader.result;
    };
  }

  getProfile() {
    this.adminService.getProfile().subscribe(
      (response: any) => {
        this.profile = response.user;
        this.feedbacks = response.feedBack
        this.modalData = {
          name: response.user.name,
          image: response.user.image,
          email: response.user.email,
        };
        this.submitLoading = false;

        if (response.user.image != null) {
          this.previewImg = response.user.image;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  dateFormat(date: any) {
    return moment(date).fromNow();
  }
}
