import { Component } from '@angular/core';
import { AnalyticService } from '../../../shared/services/analytic.service';
import { ActivatedRoute,Router } from '@angular/router';

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
    newDate:any;
    years:number[]=[]
    selectedYear:any;
    chosen:any;
    batch:number = 0
    currentRoute:any;
    routingObj:any = {
        'Employed':'/admin/analytics',
        'SelfEmployed':'/admin/analytics/self-employed',
        'Unemployed':'/admin/analytics/unemployed'
    }


    constructor(
        private _analyticService:AnalyticService,
        public route:ActivatedRoute,
        private router: Router
    ) {

    }

    selectedByBatch(event:any){
        this.batch = event.target.value
        this.router.navigate([],{
            queryParams:{batch:this.batch},
            queryParamsHandling:'merge'
        })
        this.showData(this.routeSelected)
    }

    changeSelectedRoute(status:string){
        this.routeSelected = status
        this.showData(status)
        this.currentRoute = this.routingObj[status]
    }


    showData(status:string){
        this.isLoading = true
        this.route.queryParams.subscribe((value) => {
            this.newDate = value['year'] ? value['year'] : new Date().getFullYear();
        });
        this._analyticService.usersTookTheSurvey(status,this.newDate,this.batch).subscribe({
            next:(res)=>{
                this.isLoading = false
                this.maleData = res.male
                this.femaleData = res.female
                this.label = res.label
                this.employmentsCount = res.employmentsCount
                this.viewChart()
            },complete:()=>{
                this.isLoading = false
            },error:()=>{
                this.isLoading = false
            }
        })
    }




    ngOnInit() {

        this.changeSelectedRoute(this.routeSelected)
        for(let year = new Date().getFullYear(); year >= 2000; year--) {
            this.years.push(year);
        }
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
