import { Component } from '@angular/core';
import { AnalyticService } from '../../shared/services/analytic.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

  employmentCount:number = 0
  countCustomSurvey:number = 0

  constructor(
    private _analyticService:AnalyticService
  ){
    this.getOverView()
  }

  getOverView(){
    this._analyticService.surveyOverView().subscribe({
      next:(data)=>{
        console.log(data)
        this.employmentCount = data.surveyCount
        this.countCustomSurvey = data.countCustomSurvey
      }
    })
  }

}
