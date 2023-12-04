import { Component,OnInit } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employed-analytics',
  templateUrl: './employed-analytics.component.html',
  styleUrls: ['./employed-analytics.component.scss']
})
export class EmployedAnalyticsComponent implements OnInit{
  data:any=[]
  newDate:any;
  others:any=[]
  createEventModal:boolean = false
  title:any;
  batch:number = 0
  constructor(
    private _analyticService:AnalyticService,
    private route: ActivatedRoute,
    private router: Router
  ){

  }

  getData(year:number){
    this._analyticService.otherEmployedDetails(year,this.batch).subscribe({
      next:(res)=>{
        this.data =res
      }
    })
  }

  changeParams(){
    this.route.queryParams.subscribe(params => {
      this.newDate = params['year'] ?? new Date().getFullYear()
      this.batch = params['batch'] ?? 0;
      this.getData(this.newDate)
    });
    
  }

  // ngOnChanges(){
  //   this.changeParams()
  // }

  ngOnInit(): void {
    // this.changeParams()
  }

  ngDoCheck(): void{
    this.changeParams()
  }

  viewOthers(field:any){
    let fieldObj:any = {
      'OtherReasonOfHiring':'Job Source',
      'OtherOccupClass':'Occupation',
      'typeOfOrg':'Type Of Organization'
    }
    this.title = fieldObj[field]
    this.createEventModal = true
    this._analyticService.otherAnswer(field,this.newDate,this.batch).subscribe((res)=>{
      this.others = res
    })
  }

}
