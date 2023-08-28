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
    employmentsCount:number = 0
    label:string[]=[]


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
                this.label = res.label
                this.employmentsCount = res.employmentsCount
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
            labels: this.label,
            datasets: [
                {
                    label: 'Male',
                    data: this.maleData,
                    fill: true,
                    borderColor: '#42A5F5',
                    backgroundColor:'rgba(66, 165, 245 ,0.1)',
                    tension: .4
                },
                {
                    label: 'Female',
                    data: this.femaleData,
                    fill: true,
                    borderColor: '#FF00FF',
                    backgroundColor:'rgba(255, 0, 255,0.1)',
                    tension: .4
                }
            ]
        };
        
    }
}
