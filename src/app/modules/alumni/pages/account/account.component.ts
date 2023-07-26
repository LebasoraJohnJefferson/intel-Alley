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
  defaultImg: any = '../../../../../assets/images/admin.png';
  previewImg: any = '';

  isLoading: boolean = true;

  changePassData: any = {
    oldpass: null,
    newpass: null,
  };

  history: any = [
    {
      createdAt: new Date(),
      job: 'Web Developer',
      description: 'lorem ipsum dolor',
    },
    {
      createdAt: new Date(),
      job: 'Web Developer',
      description:
        'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor',
    },
    {
      createdAt: new Date(),
      job: 'Web Developer',
      description:
        'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor',
    },
  ];

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
        this.modalData = response.user;
        this.submitLoading = false;

        if (response.image != null) {
          this.previewImg = response.image;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  dateFormat(date: any) {
    return moment(date).fromNow();
  }
}
