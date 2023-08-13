import { Component,OnInit } from '@angular/core';
import { SurveyService } from '../../shared/services/survey.service';


@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  isSurveyTaken:boolean = false
  surveyId:number = -1
  toFillUp:any;
  surveyArray:any=[]
  constructor(
    private _surveyService:SurveyService
  ){
    
  }

  ngOnInit(): void {
    this.checkSurvey()
    this.unAnswerSurvey()
  }

  checkSurvey(){
    this._surveyService.checkSurvey().subscribe({
      next:(data:any)=>{
        this.isSurveyTaken = data.isTaken
      }
    })
  }

  refreshSurveyTrigger(surveyId:number){
    this.surveyId = surveyId
    this.unAnswerSurvey()
  }


  unAnswerSurvey(){
    this._surveyService.unAnswerSurvey().subscribe({
      next:(res:any)=>{
        this.surveyArray = res.surveyNotAnswer
        this.surveyId = this.isSurveyTaken && this.surveyArray.length != 0 ? this.surveyArray[0].id : -1
        if(this.isSurveyTaken){
          this.toFillUp = this.surveyArray.filter((data:any)=>{if(data.id == this.surveyId) return data})
        }
      },error:(error:any)=>{
        console.log(error)
      }
    })
  }

  formChange(event:any){
    this.surveyId = event.target.value
    this.toFillUp = this.surveyArray.filter((data:any)=>{if(data.id == this.surveyId) return data})
  }

  submitSurvey(){
    this.checkSurvey()
  }

}
