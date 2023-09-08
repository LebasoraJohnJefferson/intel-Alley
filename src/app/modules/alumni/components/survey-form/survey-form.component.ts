import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import {FormBuilder, Validators,FormGroup,FormControl} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { SurveyService } from '../../shared/services/survey.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {  
    @Output() submitSurveyEmit: EventEmitter<any> = new EventEmitter
    tempRowIndex:any;
    uploadFilePoorOfEmp:any;
    uploadFileCertificateOfEmp:any;
    uploadFileProofOfSelfEmploy:any;
    onLoadFilePoorOfEmp:any;
    onLoadFileCertificateOfEmp:any;
    onLoadFileProofOfSelfEmploy:any;
    selectedCategories:any;
    selectedTypeOfOrganization:any;
    selectedJobStatus:any;
    selectedOccupation:any;
    selectedReasonOfHiring:any;
    
    showEmploymentStatusForm:string = ''
    isOtherOccupation:boolean = false
    isOtherCurrentJob:boolean = false
    isSelectedDegreeRelative:any;
    particularsValue:any;
    isSubmitting:boolean = false

    selfEmployInfo!: FormGroup;

    categories: any[] = [
        { name: 'Employed', key: 'Employed' },
        { name: 'Self-employed', key: 'Self-employed' },
        { name: 'Unemployed', key: 'Unemployed' },
    ];


    workExp:any=[
      {name:'0-6 months' ,key:'workEpx0_6'},
      {name:'7 months - 1 year' ,key:'workEpx7_1y'},
      {name:'2 years - 3 years' ,key:'workEpx2y_3y'},
      {name:'4 years - 5 years' ,key:'workEpx4y_5y'},
      {name:'6 years - 7 years' ,key:'workEpx6y_7y'},
      {name:'8 years - 9 years' ,key:'workEpx8y_9y'},
      {name:'10 years & onwards' ,key:'workEpx10y_more'}
    ]

    typeOfOrganization: any[]=[
      {name:"Private",key:'Private' },
      { name:"Government",key:'Government' },
    ]

    occupationClass:any[]=[
      { name:"System Analyst",key:'System Analyst' },
      { name:"System Integration",key:'System Integration' },
      { name:"It Audit Assistant",key:'It Audit Assistant' },
      { name:"QA Specialist",key:'QA Specialist' },
      { name:"Web Applications Developer",key:'Web Applications Developer' },
      { name:"Computer Programmer",key:'Computer Programmer' },
      { name:"Junior Database Administrator",key:'Junior Database Administrator' },
      { name:"Multimeida Specialist",key:'Multimeida Specialist' },
      { name:"Technical Support Specialist",key:'Technical Support Specialist' },
      { name:"Network Engineer",key:'Network Engineer'},
      { name:"Systems Administrator",key:'Systems Administrator'},
      { name:"Junior Information Security Administrator",key:'Junior Information Security Administrator'},
      { name:"Other",key:'Other'}
    ]

    jobStatus: any[]=[
      {name:"Permanent",key:'Permanent' },
      { name:"Temporary",key:'Temporary' },
      { name:"Contractual",key:'Contractual' },
      { name:"Job Order/Casual/COS",key:'Order/Casual/COS' },
    ]

    eduBG:any=[
      { name: 'Elementary', key: 'elementary' },
      { name: 'Secondary', key: 'secondary' },
      { name: 'Tertiary', key: 'tertiary' },
      { name: 'Baccalaureate', key: 'baccalaureate' },
      { name: 'Master', key: 'master' },
      { name: 'Doctorate', key: 'doctorate' }
    ]

    reasonOfHiringList:any=[
      { name: 'Through friends and relatives', key: 'throughFriendsAndRelatives' },
      { name: 'Advertisement in media', key: 'advertisementInMedia' },
      { name: 'Walk-in Applicant', key: 'walkInApplicant' },
      { name: 'Arrange by school job placement officer', key: 'arrangeBySchoolJobPlacementOfficer' },
      { name: 'Other', key: 'Other' },
    ]

   

    isJobIsBaseOnDegreeTaken:any=[
      { name: 'Yes', key: true },
      { name: 'No', key:false },
    ]

    workHistory:any=[
      {
        name:'firstForm',
        nameOfInputs:['NameOfCompany','Address','YearEmployed','Designation','NumOfYrServed','MonthlyIncome']
      },
      {
        name:'secondForm',
        nameOfInputs:['NameOfCompany','Address','YearEmployed','Designation','NumOfYrServed','MonthlyIncome']
      }
    ]

    

    recommendation=this._formBuilder.group({
      context:['',Validators.required]
    })

    workHistoryFB:any = this._formBuilder.group({
      firstForm:this._formBuilder.group({
        NameOfCompany:[''],
        Address:[''],
        YearEmployed:[''],
        Designation:[''],
        NumOfYrServed:[''],
        MonthlyIncome:[''],
      }),
      secondForm:this._formBuilder.group({
        NameOfCompany:[''],
        Address:[''],
        YearEmployed:[''],
        Designation:[''],
        NumOfYrServed:[''],
        MonthlyIncome:[''],
      }),
    })
    


      generalInfo = this._formBuilder.group({
        birthDay:['',[Validators.required]],
        address: ['', [Validators.required]],
        secondaryEmail: ['', [Validators.required,Validators.email]],
        contactNumber: ['', [Validators.required, Validators.pattern(/^(\9)\d{9}$/)]],
        civilStatus:['',[Validators.required]],
        sex:['',[Validators.required]]
      });




      educationalBG = this._formBuilder.group({
        elementary:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required],
        }),
        secondary:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        }),
        tertiary:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        }),
        baccalaureate:this._formBuilder.group({
          university:[''],
          highLvl:[''],
          yearGraduated:['']
        }),
        master:this._formBuilder.group({
          university:[''],
          highLvl:[''],
          yearGraduated:['']
        }),
        doctorate:this._formBuilder.group({
          university:[''],
          highLvl:[''],
          yearGraduated:['']
        }),
        profExam1:this._formBuilder.group({
          examName:[''],
          yearOfExam:[''],
          rating:['']
        }),
        profExam2:this._formBuilder.group({
          examName:[''],
          yearOfExam:[''],
          rating:['']
        })
      });


      employmentInfo = this._formBuilder.group({
        typeOfOrgChosen:['', Validators.required],
        proofOfEmp:['', Validators.required],
        jobStatus:['', Validators.required],
        workPosition:['', Validators.required],
        orgName:['', Validators.required],
        orgAddress:['', Validators.required],
        yrsInCompany:['', Validators.required],
        awards:['', Validators.required],
        monthlyIncome:['', Validators.required],
        occupClass:['', Validators.required],
        reason:[''],
        reasonOfHiring:['', Validators.required],
        otherReasonOfHiring:[''],
        isDegreeRelativeTakenInEVSU:['',Validators.required],
        CertificateOfEmploy:['',Validators.required],
        workEpx0_6:this._formBuilder.group({
          natureOfWork:['',Validators.required],
          jobStatus:['',Validators.required],
          JobRelatedToDegree:['',Validators.required],
          enrolledOtherCourses:['',Validators.required],
        }),
        workEpx7_1y:this._formBuilder.group({
          natureOfWork:[''],
          jobStatus:[''],
          JobRelatedToDegree:[''],
          enrolledOtherCourses:[''],
        }),
        workEpx2y_3y:this._formBuilder.group({
          natureOfWork:[''],
          jobStatus:[''],
          JobRelatedToDegree:[''],
          enrolledOtherCourses:[''],
        }),
        workEpx4y_5y:this._formBuilder.group({
          natureOfWork:[''],
          jobStatus:[''],
          JobRelatedToDegree:[''],
          enrolledOtherCourses:[''],
        }),
        workEpx6y_7y:this._formBuilder.group({
          natureOfWork:[''],
          jobStatus:[''],
          JobRelatedToDegree:[''],
          enrolledOtherCourses:[''],
        }),
        workEpx8y_9y:this._formBuilder.group({
          natureOfWork:[''],
          jobStatus:[''],
          JobRelatedToDegree:[''],
          enrolledOtherCourses:[''],
        }),
        workEpx10y_more:this._formBuilder.group({
          natureOfWork:[''],
          jobStatus:[''],
          JobRelatedToDegree:[''],
          enrolledOtherCourses:[''],
        })
      });

      

      

      unEmploy=this._formBuilder.group({
        reasonOfUnEmploy:['',Validators.required]
      })

      

      fourthFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
      fifthFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });

      isEditable = false;

      constructor(
        private _formBuilder: FormBuilder,
        public toast:HotToastService,
        private _surveyService:SurveyService
      ) {}

      ngOnInit() {
        this.selfEmployInfo = new FormGroup({
          businessName: new FormControl('', [Validators.required]),
          address: new FormControl('', [Validators.required]),
          natureOfBusiness: new FormControl('', [Validators.required]),
          proofOfSelfEmployFile: new FormControl(),
        });
      }


      

      changeEmploymentStatus(value:any){
          this.selectedCategories = [value];
          // show the form base on the employee choice in Current Employment Status
          this.showEmploymentStatusForm = value
      }


      


      

      changeTypeOfOrganization(value:any){
        this.selectedTypeOfOrganization = [value];
      }

      changeOccupationClass(value:any){
        this.isOtherOccupation = value == 'Other'
        this.selectedOccupation = value == 'Other' ? [] : [value];
        this.employmentInfo.controls['reason']?.setValue('')
      }
      
      changeCauseOfHiring(value:any){
        this.isOtherCurrentJob = value == 'Other'
        this.employmentInfo.controls['reasonOfHiring']?.setValue('')
        this.selectedReasonOfHiring = value == 'Other' ? [] : [value];
      }

      changeJobStatus(value:any){
        this.selectedJobStatus = [value];
      }

      changeIsDegreeRelative(value:any){
        this.isSelectedDegreeRelative = [value]
      }


      // upload proof 
      uploadProof(event:any){
        if(event.target.files[0]){
          this.uploadFilePoorOfEmp = event.target.files[0]
        }
        if(!event.target.files[0] || event.target.files[0].length == 0) {
          this.toast.warning('You must select an File');
          return;
        }
    
        // var mimeType = event.target.files[0].type;
    
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    
        reader.onload = (_event) => {
          this.onLoadFilePoorOfEmp = `${reader.result}` 
        }
      }

      clickUploadProof(){
        let element: HTMLElement = document.querySelector('input[name="proofOfEmployment"]') as HTMLElement;
        if (element) element.click();
      }

      // upload cirtificate of employment

      uploadCertificateOfEmp(event:any){
        if(event.target.files[0]){
          this.uploadFileCertificateOfEmp = event.target.files[0]
        }
        if(!event.target.files[0] || event.target.files[0].length == 0) {
          this.toast.warning('You must select an File');
          return;
        }
    
        // var mimeType = event.target.files[0].type;
    
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    
        reader.onload = (_event) => {
          this.onLoadFileCertificateOfEmp = `${reader.result}` 
        }
      }

      clickUploadCertificateOfEmployment(){
        let element: HTMLElement = document.querySelector('input[name="CertificateOfEmployment"]') as HTMLElement;
        if (element) element.click();
      }

      
      uploadProofOfSelfEmploy(event:any){
        if(event.target.files[0]){
          this.uploadFileProofOfSelfEmploy = event.target.files[0]
        }
       

        if(!event.target.files[0] || event.target.files[0].length == 0) {
          this.toast.warning('You must select an File');
          return;
        }
        
        // var mimeType = event.target.files[0].type;
        
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        
        reader.onload = (_event) => {
          this.onLoadFileProofOfSelfEmploy = `${reader.result}` 
        }
      }
      
      clickUploadSelfEmploy(){
        let element: HTMLElement = document.querySelector('input[name="proofOfSelfEmploy"]') as HTMLElement;
        if (element) element.click();
      }

      submitSurvey(){
        this.isSubmitting = true
        let errorMsg = ''
        if(this.generalInfo.invalid) errorMsg = 'General Info Empty Inputs'
        if(this.generalInfo.controls.contactNumber.invalid && errorMsg!='') errorMsg = 'Contact number inputs error'
        if(this.educationalBG.controls.elementary.invalid || this.educationalBG.controls.secondary.invalid || this.educationalBG.controls.tertiary.invalid) errorMsg+= errorMsg != '' ? '<br/>Educational Background Empty Inputs' : 'Educational Background Empty Inputs'  
        if(this.showEmploymentStatusForm == '') errorMsg+= errorMsg != '' ? '<br/>Employment Information Empty Inputs' : 'Employment Information Empty Inputs'
        if(this.recommendation.invalid) errorMsg+= errorMsg != '' ? '<br/>Final Survey Empty Inputs' : 'Final Survey Empty Inputs'  
        if(errorMsg!=''){
          this.toast.warning(errorMsg)
          this.isSubmitting = false
          return
        }

        
        if(this.showEmploymentStatusForm == 'Employed'){
          let temp:any = {
            general:this.generalInfo.value,
            education:this.educationalBG.value,
            employInfo:this.employmentInfo.value,
            history:this.workHistoryFB.value,
            recommend:this.recommendation.value,
          }
          this._surveyService.employed(this.uploadFilePoorOfEmp,this.uploadFileCertificateOfEmp,temp).subscribe({
            next:(res)=>{
              this.submitSurveyEmit.emit()
              this.toast.success(res.message)
              this.isSubmitting = false
            },
            error:(errorMsg)=>{
              this.isSubmitting = false
              if(errorMsg.error) this.toast.warning(errorMsg.error.message)
            },
            complete:()=>{

            }
          })
        }else if(this.showEmploymentStatusForm == 'Self-employed'){
          
          let temp:any = {
            general:this.generalInfo.value,
            education:this.educationalBG.value,
            employInfo:this.selfEmployInfo.value,
            history:this.workHistoryFB.value,
            recommend:this.recommendation.value
          }

          this._surveyService.selfEmployed(this.uploadFileProofOfSelfEmploy,temp).subscribe({
            next:(res:any)=>{
              this.submitSurveyEmit.emit()
              this.toast.success(res.message)
              this.isSubmitting = false
            },
            error:(err:any)=>{
              this.isSubmitting = false
              this.toast.warning(err.error.message || err.message)
            },
            complete:()=>{
              this.isSubmitting = false
            }
          })
        }else if(this.showEmploymentStatusForm == 'Unemployed'){
          let temp:any = {
            general:this.generalInfo.value,
            education:this.educationalBG.value,
            employInfo:this.unEmploy.value,
            history:this.workHistoryFB.value,
            recommend:this.recommendation.value
          }
          this._surveyService.unemployed(temp).subscribe({
            next:(res:any)=>{
              this.submitSurveyEmit.emit()
              this.toast.success(res.message)
              this.isSubmitting = false

            },
            error:(err:any)=>{
              this.isSubmitting = false
              this.toast.success(err.error.message || err.message)
            },
            complete:()=>{

            }
          })
        }else{
          this.isSubmitting = false
          this.toast.warning("Employment Information is Required")
        }


      }

}
