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
  batch:number =0

  constructor(
    private _analyticService:AnalyticService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
  }

  ngDoCheck(){
    this.changeParams()
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
    this._analyticService.otherUnemployedDetails(year,this.batch).subscribe({
      next:(res)=>{
        this.unemployedDetails = res
      }
    })
  }

  ngOnChanges(){
    this.changeParams()
  }

}
