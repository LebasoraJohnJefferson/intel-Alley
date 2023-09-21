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
  constructor(
    private _analyticService:AnalyticService,
    private route: ActivatedRoute,
  ){
    
  }

  ngOnInit(): void {
    this.changeParams()
  }


  changeParams(){
    this.route.queryParams.subscribe((value) => {
      const yearString = value['year']
      if(/^\d+$/.test(yearString)){
        this.newDate = parseInt(yearString, 10);
      }else{
        this.newDate = new Date().getFullYear()
      }
      this.getData(this.newDate)
    });
  }

  getData(year:number){
    this._analyticService.otherSelfEmployedDetails(year).subscribe({
      next:(res)=>{
        this.selfEmployedDetails = res
      }
    })
  }

  ngOnChanges(){
    this.changeParams()
  }

}
