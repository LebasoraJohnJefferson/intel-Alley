import { Component,OnInit,Input } from '@angular/core';
import { SurveyService } from '../../shared/services/survey.service';


@Component({
  selector: 'app-survey-content',
  templateUrl: './survey-content.component.html',
  styleUrls: ['./survey-content.component.scss']
})
export class SurveyContentComponent implements OnInit{
  
  reports:Array<any> = []
  surveyName:string = 'firstReport'




  constructor(
    private surveyService:SurveyService
  ){
  }
  
  

  ngOnInit(): void {
    this.getResult(this.surveyName)
  }


  getResult(surveyName: string) {
    this.surveyService.getResult().subscribe({
      next: (data: any) => {
        const surveyData: { [key: string]: { [key: string]: number } } = data[surveyName];
        
        const newArray = Object.entries(surveyData).map(([name, surveyData]) => {
          return { result: Object.values(surveyData), question: name };
        });
        this.reports = newArray;
      },
      error: () => {
        // Handle the error here
      }
    });
  }
  

  
}
