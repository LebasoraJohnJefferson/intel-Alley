import { Component } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
  basicData: any;
    multiAxisData: any;
    multiAxisOptions: any;
    lineStylesData: any;
    basicOptions: any;
    routeSelected:number = 0
    dataLabel:string[]=['0','1']
    surveys:any[] = []
    data:number[] = [0,1]
    isLoading:boolean = true
    employmentsCount:number = 0
    isNoSurvey:boolean = false
    label:string = ''
    


    constructor(
      private _analyticService:AnalyticService
    ) {
      
    }

    getSurvey(surveyId:number){
      this.routeSelected = surveyId
      this.viewChart(surveyId)
    }


    ngOnInit() {
      this._analyticService.surveyLabel().subscribe({
        next:(res)=>{
          this.isLoading = false
           this.surveys = res.surveys
          this.isNoSurvey = this.surveys?.length == 0
          if(!this.isNoSurvey){
            this.getSurvey(this.surveys[0].id)
          }
        },complete:()=>{
          this.isLoading = false
        }
      })
    }

    viewChart(surveyId:number){
      this._analyticService.getDataSet(surveyId).subscribe({
        next:(res)=>{
          this.basicData = {
            labels: res.label,
            datasets: res.dataSet
        };
        }
      })
    }
}

