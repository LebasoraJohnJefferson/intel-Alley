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
    routeSelected:string = ''
    dataLabel:string[]=['0','1']
    surveys:string[] = []
    data:number[] = [0,1]
    isLoading:boolean = true
    employmentsCount:number = 0
    isNoSurvey:boolean = false
    label:string = ''
    


    constructor(
      private _analyticService:AnalyticService
    ) {
      this._analyticService.surveyLabel().subscribe({
        next:async (res)=>{
          this.isLoading = false
           this.surveys = await res.label
          this.isNoSurvey = this.surveys?.length == 0
          this.getSurvey()
          this.changeSelectedRoute('')
        },complete:()=>{
          this.isLoading = false
        }
      })
    }

    getSurvey(){
    }

    changeSelectedRoute(status:string){
        this.routeSelected = status
        this.showData(status)
    }

    showData(status:string){
      this.viewChart()
    }


    ngOnInit() {

    }

    viewChart(){
        this.basicData = {
            labels: this.dataLabel,
            datasets: [
                {
                    label: this.label,
                    data: this.data,
                    fill: true,
                    borderColor: '#0DF726',
                    backgroundColor:'rgba(13, 247, 38 ,0.1)',
                    tension: .4
                }
            ]
        };
        
    }
}

