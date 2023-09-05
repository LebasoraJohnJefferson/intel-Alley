import { Component } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';

@Component({
  selector: 'app-unemployed-analytics',
  templateUrl: './unemployed-analytics.component.html',
  styleUrls: ['./unemployed-analytics.component.scss']
})
export class UnemployedAnalyticsComponent {

  unemployedDetails:any = []


  constructor(
    private _analyticService:AnalyticService
  ){
    this._analyticService.otherUnemployedDetails().subscribe({
      next:(res)=>{
        this.unemployedDetails = res
        console.log(this.unemployedDetails)
      }
    })
  }

}
