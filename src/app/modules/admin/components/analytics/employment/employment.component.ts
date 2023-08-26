import { Component } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss']
})
export class EmploymentComponent {
    basicData: any;
    multiAxisData: any;
    multiAxisOptions: any;
    lineStylesData: any;
    basicOptions: any;
    routeSelected:string = 'Employed'
    femaleData:number[] = []
    maleData:number[] = []
    isLoading:boolean = false


    constructor(
        private _analyticService:AnalyticService
    ) {}

    changeSelectedRoute(status:string){
        this.routeSelected = status
        this.showData(status)
    }

    showData(status:string){
        this.isLoading = true
        this._analyticService.usersTookTheSurvey(status).subscribe({
            next:(res)=>{
                this.isLoading = false
                this.maleData = res.male
                this.femaleData = res.female
                this.viewChart()
            },complete:()=>{
                this.isLoading = false
            }
        })
    }


    ngOnInit() {
      this.showData(this.routeSelected)
    }

    viewChart(){
        this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets: [
                {
                    label: 'Male',
                    data: this.maleData,
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                },
                {
                    label: 'Female',
                    data: this.femaleData,
                    fill: false,
                    borderColor: '#FF00FF',
                    tension: .4
                }
            ]
        };
        
    }
}
