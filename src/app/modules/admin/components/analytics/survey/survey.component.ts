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
    femaleData:number[] = []
    maleData:number[] = []
    isLoading:boolean = true
    isDataLoading:boolean = true
    employmentsCount:number = 0
    isNoSurvey:boolean = false
    surveys:string[] = []
    


    constructor(
      private _analyticService:AnalyticService
    ) {
      this._analyticService.surveyLabel().subscribe({
        next:async (res)=>{
          this.isLoading = false
           this.surveys = await res.label
          this.isNoSurvey = this.surveys?.length == 0
          this.getSurvey()
        },complete:()=>{
          this.isLoading = false
        }
      })
    }

    getSurvey(){
      this.isDataLoading = true
    }

    changeSelectedRoute(status:string){
        this.routeSelected = status
        this.showData(status)
    }

    showData(status:string){
    }


    ngOnInit() {

    }

    viewChart(){
        this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets: [
                {
                    label: 'Male',
                    data: this.maleData,
                    fill: true,
                    borderColor: '#42A5F5',
                    backgroundColor:'rgba(66, 165, 245 ,0.1)',
                    tension: .4
                },
                {
                    label: 'Female',
                    data: this.femaleData,
                    fill: true,
                    borderColor: '#FF00FF',
                    backgroundColor:'rgba(255, 0, 255,0.1)',
                    tension: .4
                }
            ]
        };
        
    }
}

