import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HotToastService } from '@ngneat/hot-toast';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/shared/services/auth.service';
import { AlumniService } from '../../shared/services/alumni.service';
import { CourseService } from 'src/app/core/shared/services/course.service';
import { SurveyService } from '../../shared/services/survey.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

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
  isChangingGeneralInfo:boolean = false;
  courses: any;
  defaultImg: any = '../../../../../assets/images/student.png';
  previewImg: any = '';
  isGeneralInfoSubmitting:boolean = false
  isLoading: boolean = true;
  isRetaking:boolean = false
  changePassData: any = {
    oldpass: null,
    newpass: null,
  };
  isTaken:boolean = false
  employementType:string =''

  records:any = []

  generalInfo: any =[];
  chosenRecord:number=0;
  educationBG:any=[];
  workExpOneYearAbove:any=[];
  feedBack:any=[];
  selfEmployed:any =[];
  unemployed:any =[];
  professionalExam:any =[]
  employed:any =[]
  isYearChanges:boolean = false
  isLatestId:boolean = false
  surveyId:number = 0
  changePasswordModal: boolean = false;
  workExp: any = {
    'workEpx0_6':'0-6 months',
    'workEpx7_1y':'7 months - 1 year',
    'workEpx2y_3y':'2 years - 3 years',
    'workEpx4y_5y':'4 years - 5 years',
    'workEpx6y_7y':'6 years - 7 years',
    'workEpx8y_9y':'8 years - 9 years',
    'workEpx10y_more':'10 years & onwards'
  };

  generalInfoForm = this._formBuilder.group({
    birthDay: ['', [Validators.required]],
    address: ['', [Validators.required]],
    secondaryEmail: ['', [Validators.required, Validators.email]],
    contactNumber: [
      '',
      [Validators.required, Validators.pattern(/^(\9)\d{9}$/)],
    ],
    civilStatus: ['', [Validators.required]],
    sex: ['', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private toast: HotToastService,
    private router: Router,
    private authService: AuthService,
    private alumniService: AlumniService,
    private courseService: CourseService,
    private _surveyService:SurveyService
  ) {
  }

  changeGeneralInfo(){
    this.isGeneralInfoSubmitting = true
    if(this.generalInfoForm.valid){
      this.alumniService.editGeneralInfo(this.generalInfoForm.value,this.surveyId).subscribe({
        next:(res:any)=>{
          this.toast.success(res.message)
          this.recordsBySurveyId()
          this.isChangingGeneralInfo = false
        },error:(err:any)=>{
          let msg = err?.error?.message ?? "Pls, fill-up all the necessary details!"
          this.toast.error(msg)
        }
      })
      this.isGeneralInfoSubmitting = false
    }else{
      let msg = ''
      if(this.generalInfoForm.controls['secondaryEmail'].invalid) msg+= "Invalid email\n"
      if(this.generalInfoForm.controls['contactNumber'].invalid) msg+= msg ? "and Invalid contact number\n" : "Invalid contact number\n"
      if(this.generalInfoForm.controls['birthDay'].invalid) msg+= msg ? "and Invalid date for birth day\n" : "Invalid date for birth day\n"
      
      msg = msg ? msg : "Pls, fill-up all the necessary details"
      this.toast.warning(msg)
      this.isGeneralInfoSubmitting = false
    }
  }

  openGeneralInfoForm(){
    this.isChangingGeneralInfo = true
    this.generalInfo[0].birthDay = moment(new Date(this.generalInfo[0].birthDay)).format('YYYY-MM-DD')
    this.generalInfoForm.patchValue(this.generalInfo[0])
  }
  

  retaking(){
    this.isRetaking = true
    this._surveyService.retake().subscribe({
      next:(res:any)=>{
        this.toast.success(res.message)
        this.isRetaking = false
        this.router.navigate(['/surveys'])
      },error:(error: any)=>{
        console.log(error)
        this.isRetaking = false
        this.toast.warning("Request Denied, kindly check if you already taken the survey!")
      }
    })
  }

  ngOnInit(): void {
    this.getProfile();
    this.getCourses();
    this.getListOfRecord()
  }

  momentMDY(date: any) {
    return moment(date).format('ll');
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

  getListOfRecord(){
    this.alumniService.getListOfRecords().subscribe({
      next:(response:any)=>{
        this.records = response.records
        this.chosenRecord= this.records[0].id ?? 0
        this.recordsBySurveyId()
      },error:(err:any)=>{
        console.log(err)
      }
    })
  }

  selectedRecord(event:any){
    this.chosenRecord = event.target.value
    this.recordsBySurveyId()
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

  recordsBySurveyId(){
    this.isYearChanges = false
    this.alumniService.recordsBySurveyId(this.chosenRecord).subscribe(
      {
        next:(response:any)=>{
          this.isLatestId = response.isLatestId
          this.surveyId = response?.user?.IsSurveyTaken?.id
          this.isTaken = response?.user?.IsSurveyTaken?.isTaken
          this.employementType= response?.user?.IsSurveyTaken?.type
          this.generalInfo = [response?.user?.IsSurveyTaken?.GeneralInfo]
          this.educationBG = [response?.user?.IsSurveyTaken?.EducationBackGs]
          this.workExpOneYearAbove = [response?.user?.IsSurveyTaken?.WorkHistoryOneUps]
          this.feedBack = [response?.user?.IsSurveyTaken?.Feedbacks]
          this.selfEmployed = [response?.user?.IsSurveyTaken?.SelfEmployed]
          this.professionalExam = [response?.user?.IsSurveyTaken?.ProfessionalExams]
          this.unemployed = [response?.user?.IsSurveyTaken?.Unemployed]
          this.employed = [response?.user?.IsSurveyTaken?.Employed]
          this.isYearChanges = true
          this.submitLoading = false;
        },error:(error:any)=>{
          console.log(error)
        }
      }
    )
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
