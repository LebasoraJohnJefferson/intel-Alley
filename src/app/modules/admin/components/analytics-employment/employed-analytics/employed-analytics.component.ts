import { Component } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';

@Component({
  selector: 'app-employed-analytics',
  templateUrl: './employed-analytics.component.html',
  styleUrls: ['./employed-analytics.component.scss']
})
export class EmployedAnalyticsComponent {
  data:any=[]
  others:any=[]
  createEventModal:boolean = false
  title:any;
  constructor(
    private _analyticService:AnalyticService
  ){
    this._analyticService.otherEmployedDetails().subscribe({
      next:(res)=>{
        this.data =res
      }
    })
  }
  
  viewOthers(field:any){
    this.title = field == 'OtherOccupClass' ? 'Occupation' : 'Job Source'
    this.createEventModal = true
    this._analyticService.otherAnswer(field).subscribe((res)=>{
      this.others = res
    })
  }

}
