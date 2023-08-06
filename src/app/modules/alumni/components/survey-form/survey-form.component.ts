import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
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
    selectedRatings: any[] = [];
    selectedRatings2: any[] = [];
    showEmploymentStatusForm:string = ''
    isOtherOccupation:boolean = false
    isOtherCurrentJob:boolean = false
    isSelectedDegreeRelative:any;
    particularsValue:any;
    isSubmitting:boolean = false

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

    firstSurveys:any=[
      {particulars:'Enhanced Academic Profession',key:'1'},
      {particulars:'Improved problem-solving/critical thinking skills',key:'2'},
      {particulars:'Improved research skills',key:'3'},
      {particulars:'Improved learning efficacy',key:'4'},
      {particulars:'Improved communication/ interpersonal skills',key:'5'},
      {particulars:'Improved human relation skills',key:'6'},
      {particulars:'Improved information technology skills',key:'7'},
      {particulars:'Improved Entrepreneurial Skills',key:'8'},
      {particulars:'Exposure to local and/or international community within field of specialization',key:'9'},
      {particulars:'Personality Development',key:'10'}
    ]

    firstSurveyFB=this._formBuilder.group({
      particulars1:['',Validators.required],
      particulars2:['',Validators.required],
      particulars3:['',Validators.required],
      particulars4:['',Validators.required],
      particulars5:['',Validators.required],
      particulars6:['',Validators.required],
      particulars7:['',Validators.required],
      particulars8:['',Validators.required],
      particulars9:['',Validators.required],
      particulars10:['',Validators.required],
    })


    secondSurveys:any=[
      {particulars:'Quality of Instruction/Premium given to Research',key:'1'},
      {particulars:'Range of subjects offered',key:'2'},
      {particulars:'Relevance of the program to your professional requirements',key:'3'},
      {particulars:'Extra-Curricular Activities',key:'4'},
      {particulars:'Problem Solving',key:'5'},
      {particulars:'Teaching and learning Environment',key:'6'},
      {particulars:'Teacher- Student Relationship',key:'7'},
      {particulars:'Library Resources',key:'8'},
      {particulars:'Infrastructure/ facilities/ Laboratory Resources',key:'9'},
      {particulars:'Class Size',key:'10'}
    ]

    secondSurveyFB=this._formBuilder.group({
      particulars1:['',Validators.required],
      particulars2:['',Validators.required],
      particulars3:['',Validators.required],
      particulars4:['',Validators.required],
      particulars5:['',Validators.required],
      particulars6:['',Validators.required],
      particulars7:['',Validators.required],
      particulars8:['',Validators.required],
      particulars9:['',Validators.required],
      particulars10:['',Validators.required],
    })

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
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        }),
        master:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        }),
        doctorate:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
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

      selfEmployInfo = this._formBuilder.group({
        proofOfSelfEmployFile:['',Validators.required],
        businessName:['',Validators.required],
        address:['',Validators.required],
        natureOfBusiness :['',Validators.required],
      })

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
        
      }


      

      changeEmploymentStatus(value:any){
          this.selectedCategories = [value];
          // show the form base on the employee choice in Current Employment Status
          this.showEmploymentStatusForm = value
      }


      changeRate(rowIndex: number, value: any) {
        this.selectedRatings[rowIndex] = [value];
      }


      changeRate2(rowIndex: number, value: any) {
        this.selectedRatings2[rowIndex] = [value];
      }

      changeTypeOfOrganization(value:any){
        this.selectedTypeOfOrganization = [value];
      }

      changeOccupationClass(value:any){
        this.isOtherOccupation = value == 'Other'
        this.selectedOccupation = [value];
      }
      
      changeCauseOfHiring(value:any){
        this.isOtherCurrentJob = value == 'Other'
        this.selectedReasonOfHiring = [value];
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
        // let errorMsg = ''
        // if(this.generalInfo.invalid) errorMsg = 'General Info Empty Inputs'
        // if(this.generalInfo.controls.contactNumber.invalid && errorMsg!='') errorMsg = 'Contact number inputs error'
        // if(this.educationalBG.invalid) errorMsg+= errorMsg != '' ? '<br/>Educational Background Empty Inputs' : 'Educational Background Empty Inputs'  
        // if(this.employmentInfo.invalid && this.selfEmployInfo.invalid && this.unEmploy.invalid) errorMsg+= errorMsg != '' ? '<br/>Employment Information Empty Inputs' : 'Employment Information Empty Inputs'
        // if(this.workHistoryFB.invalid || this.firstSurveyFB.invalid || this.secondSurveyFB.invalid) errorMsg+= errorMsg != '' ? '<br/>Work History Empty Inputs' : 'Work History Empty Inputs'
        // if(this.recommendation.invalid) errorMsg+= errorMsg != '' ? '<br/>Final Survey Empty Inputs' : 'Final Survey Empty Inputs'  
        // if(errorMsg!=''){
        //   this.toast.warning(errorMsg)
        //   return
        // }

        
        if(this.showEmploymentStatusForm == 'Employed'){
          let temp:any = {
            general:this.generalInfo.value,
            education:this.educationalBG.value,
            employInfo:this.employmentInfo.value,
            history:this.workHistoryFB.value,
            recommend:this.recommendation.value,
            survey:{
              firstParticulars:this.firstSurveys,
              secondParticulars:this.secondSurveys,
              firstSurvey:this.firstSurveyFB.value,
              secondSurvey:this.secondSurveyFB.value,
            }
          }
          this._surveyService.employed(this.uploadFilePoorOfEmp,this.uploadFileCertificateOfEmp,temp).subscribe({
            next:()=>{
              this.submitSurveyEmit.emit()
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
            next:()=>{
              this.submitSurveyEmit.emit()
              this.isSubmitting = false
            },
            error:()=>{
              this.isSubmitting = false
            },
            complete:()=>{

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
            next:()=>{
              this.submitSurveyEmit.emit()
              this.isSubmitting = false

            },
            error:()=>{
              this.isSubmitting = false
            },
            complete:()=>{

            }
          })
        }


      }

}
