import { Component } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unemployed-analytics',
  templateUrl: './unemployed-analytics.component.html',
  styleUrls: ['./unemployed-analytics.component.scss']
})
export class UnemployedAnalyticsComponent {

  unemployedDetails:any = []
  newDate:any;

  constructor(
    private _analyticService:AnalyticService,
    private route: ActivatedRoute
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
    this._analyticService.otherUnemployedDetails(year).subscribe({
      next:(res)=>{
        this.unemployedDetails = res
      }
    })
  }

  ngOnChanges(){
    this.changeParams()
  }

}
