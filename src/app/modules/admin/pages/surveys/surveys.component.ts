import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { SurveyService } from '../../shared/services/survey.service';
import * as moment from 'moment';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
})
export class SurveysComponent implements OnInit {
  surveys: any = [];
  courses: any = [];

  createAccountModal: boolean = false;
  submitLoading: boolean = false;
  createForm!: FormGroup;
  loadingDeleteSurveyById:number = -1
  surveyId:number = -1
  cols: any[] = [];
  exportColumns: any[] = [];
  selectedSurvey: any[] = [];

  constructor(
    private router: Router,
    private toast: HotToastService,
    private _surveyService:SurveyService
  ) {}

  importedStudents: any[] = [];

  ngOnInit(): void {
    this.getSurvey();

    this.createForm = new FormGroup({
      surveyName: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      isActive: new FormControl(''),
      description: new FormControl('',[Validators.required]),
    });

    this.cols = [
      { field: 'surveyName', header: 'Name' },
      { field: 'User.name', header: 'Admin' },
      { field: 'isActive', header: 'Active' },
      { field: 'dueDate', header: 'Due Date' }
    ];
  }

  getSurvey() {
    this._surveyService.getSurvey().subscribe({
      next:(data)=>{
        this.surveys = data.surveys
      },error:(err)=>{
        console.log(err)
      }
    })
  }


  openForm(isOpen:boolean,surveyId:number){
    this.createForm.reset()
    if(surveyId != -1){
      const getSurvey = this.surveys.filter((survey:any)=>{
        return survey.id == surveyId
      })
      this.createForm.controls['dueDate'].setValue(moment(getSurvey[0].dueDate).local().format('YYYY-MM-DD'))
      this.createForm.controls['surveyName'].setValue(getSurvey[0].surveyName)
      this.createForm.controls['isActive'].setValue(getSurvey[0].isActive)
      this.createForm.controls['description'].setValue(getSurvey[0].description)
    }
    this.createAccountModal = isOpen
    this.surveyId = surveyId
  }

  deleteSurvey(surveyId:number){
    this.loadingDeleteSurveyById = surveyId
    this._surveyService.deleteSurvey(surveyId).subscribe({
      next:(res)=>{
        this.getSurvey()
        this.loadingDeleteSurveyById = -1
        this.toast.success("Successfully deleted!")
      },error:(err)=>{
        this.loadingDeleteSurveyById = -1
        console.log(err)
      }
    })
  }


  onSubmit() {
    if (!this.createForm.valid) {
      this.toast.warning('Please fill out the fields with valid data.');
      return;
    }

    this.submitLoading = true;

    if(this.surveyId ==-1){
      const isActiveTemp = this.createForm.controls['isActive'].value == null ? false : true
      this.createForm.controls['isActive'].setValue(isActiveTemp)
      this._surveyService.createSurvey(this.createForm.value).subscribe({
          next:(response: any) => {
            this.submitLoading = false;
            this.createForm.reset();
            this.createAccountModal = false;
            this.getSurvey();
            this.toast.success(response.message);
          },
          error:(error: any) => {
            this.submitLoading = false;
            this.toast.error(error.error.message);
          }
        }
      );
    }else{
      this._surveyService.editSurvey(this.createForm.value,this.surveyId).subscribe({
        next:(response: any) => {
          this.submitLoading = false;
          this.createForm.reset();
          this.createAccountModal = false;
          this.getSurvey();
          this.toast.success(response.message);
        },
        error:(err: any) => {
          this.submitLoading = false;
          this.toast.error(err.error.message)
        }
      }
    );
    }

  }



}
