import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HotToastService } from '@ngneat/hot-toast';

import { AuthService } from 'src/app/core/shared/services/auth.service';
import { AlumniService } from '../../shared/services/alumni.service';
import { CourseService } from 'src/app/core/shared/services/course.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  profile: any = [];
  modalData: any = [];
  editModal: boolean = false;
  submitLoading: boolean = false;
  courses: any;
  defaultImg: any = '../../../../../assets/images/student.png';
  previewImg: any = '';
  isLoading: boolean = true;

  changePassData: any = {
    oldpass: null,
    newpass: null,
  };

  generalInfo: any ;

  changePasswordModal: boolean = false;

  constructor(
    private toast: HotToastService,
    private router: Router,
    private authService: AuthService,
    private alumniService: AlumniService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getCourses();
  }

  logout() {
    this.authService.logout('alumni');
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

    this.alumniService.changePassword(data).subscribe(
      (response: any) => {
        this.toast.success(response.message);

        this.submitLoading = false;

        this.changePassData = {
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

  getCourses() {
    this.courseService.getAll().subscribe(
      (response: any) => {
        this.courses = response;
      },
      (error: any) => {
        console.log(error);
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

    this.alumniService
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
    this.alumniService.getProfile().subscribe(
      (response: any) => {
        this.profile = response.user;
        this.modalData = {
          name: response.user.name,
          image: response.user.image,
          email: response.user.email,
        };
        console.log(response?.user?.IsSurveyTaken?.GeneralInfo)
        this.generalInfo = [response?.user?.IsSurveyTaken?.GeneralInfo]
        console.log(this.generalInfo)
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

  capitalize(str:any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  dateFormat(date: any) {
    return moment(date).fromNow();
  }
}
