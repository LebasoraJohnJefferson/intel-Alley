import { Component,OnInit } from '@angular/core';
import { SurveyService } from '../../shared/services/survey.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  isSurveyTaken:boolean = false

  constructor(
    private surveyService:SurveyService
  ){
    
  }

  ngOnInit(): void {
    this.checkSurvey()
  }

  checkSurvey(){
    this.surveyService.checkSurvey().subscribe({
      next:(data:any)=>{
        this.isSurveyTaken = data.isTaken
      }
    })
  }

  submitSurvey(){
    this.checkSurvey()
  }

}
