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
  constructor(
    private _analyticService:AnalyticService,
    private route: ActivatedRoute,
    private router: Router
  ){
    
  }

  getData(year:number){
    this._analyticService.otherEmployedDetails(year).subscribe({
      next:(res)=>{
        this.data =res
      }
    })
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

  ngOnChanges(){
    this.changeParams()
  }

  ngOnInit(): void {
    this.changeParams()
  }
  
  viewOthers(field:any){
    this.title = field == 'OtherOccupClass' ? 'Occupation' : 'Job Source'
    this.createEventModal = true
    this._analyticService.otherAnswer(field).subscribe((res)=>{
      this.others = res
      console.log(this.others)
    })
  }

}
