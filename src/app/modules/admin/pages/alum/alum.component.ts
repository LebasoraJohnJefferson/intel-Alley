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
  professionalExam:any;
  unemployedInfo:any;
  selfEmployed:any;
  employed:any;
  isDataLoaded:boolean = false
  workExpDictionary:any={
    'workEpx0_6':'0-6 months',
    'workEpx7_1y':'7 months - 1 year',
    'workEpx2y_3y':'2 years - 3 years',
    'workEpx4y_5y':'4 years - 5 years',
    'workEpx6y_7y':'6 years - 7 years',
    'workEpx8y_9y':'8 years - 9 years',
    'workEpx10y_more':'10 years & onwards'
  }

  educationalBG:any;
  actionModal: boolean = false;
  isLoading: boolean = true;
  defaultImg: any = '../../../../../assets/images/student.png';
  records:any = []
  status: boolean = false;
  submitLoading: boolean = false;
  selectedRecord:number=0;
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
    this.getAllRecord()
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

  selectRecord(event:any){
    this.selectedRecord=event.target.value
    this.getAlum()
  }

  getAllRecord(){
    this.alumniService.getRecords(this.alumId).subscribe({
      next:(response)=>{
        this.records = response?.records
        if(this.records[0]) this.selectedRecord = this.records[0].id
        this.getAlum();
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  getAlum() {
    this.isDataLoaded = false
    this.alumniService.getAlum(this.alumId,this.selectedRecord).subscribe(
      (response: any) => {
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
        }else{
          this.generalInformation = {}
        }

        this.educationalBG = response?.IsSurveyTaken?.EducationBackGs
        this.workHistory = response?.IsSurveyTaken?.WorkHistoryOneUps
        this.unemployedInfo = response?.IsSurveyTaken?.Unemployed
        this.employed = response?.IsSurveyTaken?.Employed
        this.selfEmployed = response?.IsSurveyTaken?.SelfEmployed
        this.professionalExam = response?.IsSurveyTaken?.ProfessionalExams


        this.isLoading = false;
        this.isDataLoaded = true

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
