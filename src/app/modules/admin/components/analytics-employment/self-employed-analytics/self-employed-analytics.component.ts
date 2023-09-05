import { Component } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';

@Component({
  selector: 'app-self-employed-analytics',
  templateUrl: './self-employed-analytics.component.html',
  styleUrls: ['./self-employed-analytics.component.scss']
})
export class SelfEmployedAnalyticsComponent {
  selfEmployedDetails:any = []

  constructor(
    private _analyticService:AnalyticService
  ){
    this._analyticService.otherSelfEmployedDetails().subscribe({
      next:(res)=>{
        this.selfEmployedDetails = res
      }
    })
  }

}
