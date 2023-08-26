import { Component } from '@angular/core';

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


    constructor() {}

    changeSelectedRoute(route:string){
        this.routeSelected = route
    }


    ngOnInit() {
        this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Male',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                },
                {
                    label: 'Female',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#FF00FF',
                    tension: .4
                }
            ]
        };
    }
}
