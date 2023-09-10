import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import * as moment from 'moment';

import { AlumniService } from '../../shared/services/alumni.service';

@Component({
  selector: 'app-alum',
  templateUrl: './alum.component.html',
  styleUrls: ['./alum.component.scss'],
})
export class AlumComponent implements OnInit {
  alumId: any;
  alum: any=[];
  profile: any = [];
  courses:any;
  generalInformation:any;
  workHistory:any;
  educationalBG:any;
  actionModal: boolean = false;
  isLoading: boolean = true;
  defaultImg: any = '../../../../../assets/images/admin.png';

  status: boolean = false;
  submitLoading: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toast: HotToastService,
    private alumniService: AlumniService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      this.alumId = value['id'];
    });

    this.getAlum();
  }

  setStatus() {
    const data = {
      status: this.status == true ? 'active' : 'inactive',
      userId: this.alum.id,
    };

    this.alumniService.updateAlumStatus(data).subscribe(
      (response: any) => {
        if (this.status == true) {
          this.toast.success('User account set to active');
        } else {
          this.toast.info('User account set to inactive');
        }
      },
      (err: any) => {
        this.toast.error(err.error.message);
      }
    );
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  getAlum() {
    this.alumniService.getAlum(this.alumId).subscribe(
      (response: any) => {
        console.log(response)
        this.alum = response;
        this.courses = {
          'Course':response?.AlumniCredential?.Course?.title,
          'Email':response?.email,
          'Student ID number':response?.AlumniCredential?.studentId,
          'Employment Status': response?.IsSurveyTaken?.type
        };
        if(response?.IsSurveyTaken?.GeneralInfo){
          this.generalInformation = {
            'Address':response?.IsSurveyTaken?.GeneralInfo?.address,
            'Birth Day':this.momentMDY(response?.IsSurveyTaken?.GeneralInfo?.birthDay),
            'Civil Status':response?.IsSurveyTaken?.GeneralInfo?.civilStatus,
            'Contact Number':response?.IsSurveyTaken?.GeneralInfo?.contactNumber,
            'Secondary Email':response?.IsSurveyTaken?.GeneralInfo?.secondaryEmail,
            'Gender':response?.IsSurveyTaken?.GeneralInfo?.sex,
          }
        }

        this.educationalBG = response?.IsSurveyTaken.EducationBackGs
        this.workHistory = response?.IsSurveyTaken?.WorkHistoryOneUps


        this.isLoading = false;

        this.status = response.status == 'active' ? true : false;
      },
      (error: any) => {}
    );
  }

  goBack(): void {
    this.location.back();
  }

  momentFormatLLL(date: any) {
    return moment(date).format('lll');
  }

  momentMDY(date: any) {
    return moment(date).format('ll');
  }

  dateFormat(date: any) {
    return moment(date).format('lll');
  }

  deleteAccount() {
    const ans = confirm('Delete this account?');

    if (!ans) return;

    this.alumniService.deleteAccount(this.alum.id).subscribe(
      (response: any) => {
        this.toast.success(response.message);
        this.router.navigate([`/admin/alumni`]);
      },
      (error: any) => {
        this.toast.error('Something went wrong');
      }
    );
  }
}
