import { Component  , OnInit } from '@angular/core';
import { AnalyticService } from '../../shared/services/analytic.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit{
  employmentCount:number = 0
  countCustomSurvey:number = 0
  currentRoute:any='employment';

  constructor(
    private _analyticService:AnalyticService,
  ){
    this.getOverView()
  }
  
  ngOnInit() {

  }

  changeRoute(routeName:string){
    this.currentRoute = routeName

  }


  getOverView(){
    this._analyticService.surveyOverView().subscribe({
      next:(data)=>{
        this.employmentCount = data.surveyCount
        this.countCustomSurvey = data.countCustomSurvey
      }
    })
  }

  

}
