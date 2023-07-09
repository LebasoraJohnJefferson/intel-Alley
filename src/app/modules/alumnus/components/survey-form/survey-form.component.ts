import { Component,OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {  
    uploadFile:any;
    onLoadFile:any;
    selectedCategories:any;
    selectedTypeOfOrganization:any;
    selectedJobStatus:any;
    selectedOccupation:any;
    showEmploymentStatusForm:string = ''
    isOtherOccupation:boolean = false


    categories: any[] = [
        { name: 'Employed', key: 'Employed' },
        { name: 'Self-employed', key: 'Self-employed' },
        { name: 'Unemployed', key: 'Unemployed' },
    ];

    typeOfOrganization: any[]=[
      {name:"Private",key:'Private' },
      { name:"Government",key:'Government' },
    ]

    occupationClass:any[]=[
      { name:"Manufacturing",key:'Manufacturing' },
      { name:"Construction",key:'Construction' },
      { name:"Wholesale and Retail Trade	",key:'Wholesale and Retail Trade	' },
      { name:"Hotels and Restaurant",key:'Hotels and Restaurant' },
      { name:"Public Administration and Defense",key:'Public Administration and Defense' },
      { name:"Financial Intermediation",key:'Financial Intermediation' },
      { name:"Other Community, Social and Personal Service Activities",key:'Other Community, Social and Personal Service Activities' },
      { name:"IT or Web developer and the like",key:'IT or Web developer and the like' },
      { name:"Other",key:'Other'}
    ]

    jobStatus: any[]=[
      {name:"Permanent",key:'Permanent' },
      { name:"Temporary",key:'Temporary' },
      { name:"Contractual",key:'Contractual' },
      { name:"Job Order/Casual/COS",key:'Order/Casual/COS' },
    ]


      generalInfo = this._formBuilder.group({
        address: ['', [Validators.required,Validators.email]],
        contactNumber: ['', [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
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
          examName:['',Validators.required],
          yearOfExam:['',Validators.required],
          rating:['',Validators.required]
        }),
        profExam2:this._formBuilder.group({
          examName:['',Validators.required],
          yearOfExam:['',Validators.required],
          rating:['',Validators.required]
        })
      });


      employmentInfo = this._formBuilder.group({
        employmentStatus: ['', Validators.required],
        typeOfOrgChosen:['', Validators.required],
        occupationClass:['', Validators.required],
        jobStatus:['', Validators.required],
      });
      fourthFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
      fifthFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });

      isEditable = false;

      constructor(
        private _formBuilder: FormBuilder,
        public toast:HotToastService
      ) {}

      ngOnInit() {
        
      }


      checkForm(){
        console.log(this.educationalBG.value)
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
        this.selectedOccupation = [value];
      }

      changeJobStatus(value:any){
        this.selectedJobStatus = [value];
      }


      // upload proof 
      uploadProof(event:any){
        if(event.target.files[0]){
          this.uploadFile = event.target.files[0]
        }
        if(!event.target.files[0] || event.target.files[0].length == 0) {
          this.toast.warning('You must select an File');
          return;
        }
    
        // var mimeType = event.target.files[0].type;
    
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    
        reader.onload = (_event) => {
          this.onLoadFile = `${reader.result}` 
        }
      }

      clickUploadProof(){
        let element: HTMLElement = document.querySelector('input[name="proofOfEmployment"]') as HTMLElement;
        if (element) element.click();
      }


}
