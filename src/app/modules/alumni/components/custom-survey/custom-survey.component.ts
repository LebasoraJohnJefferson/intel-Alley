import { Component,Input } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-custom-survey',
  templateUrl: './custom-survey.component.html',
  styleUrls: ['./custom-survey.component.scss']
})
export class CustomSurveyComponent {

  @Input() toFillUp:any;
  selectedRatings: any[] = [];
  


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

  constructor(
    private _formBuilder: FormBuilder,
  ){

  }


  ngOnChanges(){
    console.log(this.toFillUp)
  }

  changeRate(rowIndex: number, value: any) {
    this.selectedRatings[rowIndex] = [value];
  }


  

}
