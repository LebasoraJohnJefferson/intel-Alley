import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HotToastService } from '@ngneat/hot-toast';

import { AuthService } from 'src/app/core/shared/services/auth.service';

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
  previewImg: any = '';

  isLoading: boolean = true;

  profiledata: any = {
    name: null,
  };

  changePassData: any = {
    oldpass: null,
    newpass: null,
  };

  history: any = [
    {
      createdAt: new Date(),
      job: "Web Developer",
      description: "lorem ipsum dolor",
    },
    {
      createdAt: new Date(),
      job: "Web Developer",
      description: "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    },
    {
      createdAt: new Date(),
      job: "Web Developer",
      description: "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    },
  ]

  changePasswordModal: boolean = false;

  constructor(
    private toast: HotToastService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.getProfile();
  }

  logout() {
    this.authService.logout('student');
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

    // this.profileService.changePassword(data).subscribe(
    //   (response: any) => {
    //     this.toast.success(response.message);

    //     this.submitLoading = false;

    //     this.changePassData = {
    //       oldpass: null,
    //       newpass: null,
    //     };

    //     this.getProfile();

    //     this.changePasswordModal = false;
    //   },
    //   (error: any) => {
    //     this.toast.error(error.error.message);

    //     this.submitLoading = false;
    //   }
    // );
  }

  onSubmit() {
    if (this.profiledata.name == '') {
      return this.toast.info('Name is required.', {
        position: 'top-right',
      });
    }

    if (this.profiledata.username == '') {
      return this.toast.info('Username is required.', {
        position: 'top-right',
      });
    }

    if (this.profiledata.email == '') {
      return this.toast.info('Email is required.');
    }

    this.submitLoading = true;

    // this.profileService.updateProfile(this.profiledata).subscribe(
    //   (response: any) => {
    //     this.toast.success(response.message);
    //     this.submitLoading = false;
    //     this.getProfile();
    //     this.editModal = false;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     this.toast.error(error.error.message);
    //     this.submitLoading = false;
    //   }
    // );
  }

  loadInputImgToSrc(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.previewImg = reader.result;
      this.profiledata.image = reader.result;
    };
  }

  getProfile() {
    // this.profileService.getProfile().subscribe(
    //   (response: any) => {
    //     this.profile = response;

    //     this.submitLoading = false;

    //     this.profiledata = {
    //       name: response.name,
    //       username: response.username,
    //       section: response.StudentCredential.section,
    //       year: response.StudentCredential.year,
    //       image: response.image,
    //       email: response.email,
    //       CourseId: response.StudentCredential.CourseId,
    //     };

    //     if (response.image != null) {
    //       this.previewImg = response.image;
    //     }
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  dateFormat(date: any) {
    return moment(date).fromNow();
  }
}