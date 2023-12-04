import { Component, OnInit } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-self-employed-analytics',
  templateUrl: './self-employed-analytics.component.html',
  styleUrls: ['./self-employed-analytics.component.scss']
})
export class SelfEmployedAnalyticsComponent implements OnInit{
  selfEmployedDetails:any = []
  newDate:any;
  batch:number = 0
  constructor(
    private _analyticService:AnalyticService,
    private route: ActivatedRoute,
  ){
    
  }

  ngOnInit(): void {
    
  }

  detectChanges(){
    this.changeParams()
  }


  changeParams(){
    this.route.queryParams.subscribe(params => {
      this.newDate = params['year'] ?? new Date().getFullYear()
      this.batch = params['batch'] ?? 0;
      this.getData(this.newDate)
    });
  }

  getData(year:number){
    this._analyticService.otherSelfEmployedDetails(year,this.batch).subscribe({
      next:(res)=>{
        this.selfEmployedDetails = res
      }
    })
  }

  ngOnChanges(){
    this.changeParams()
  }

}
