import { Component,OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-analytic-bar-chart',
  templateUrl: './analytic-bar-chart.component.html',
  styleUrls: ['./analytic-bar-chart.component.scss']
})
export class AnalyticBarChartComponent implements OnInit {
    @Input() indexAxis:any;
    @Input() label:any = [];
    data: any;
    options: any;

    ngOnInit() {

        this.data = {
            labels: this.label,
            datasets: [
                {
                    label: 'Count of User',
                    backgroundColor: 'rgb(241, 69, 220  ,.8 )',
                    borderColor: 'rgba(247, 48, 13,.1 )',
                    data: [1, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

        this.options = {
            indexAxis: this.indexAxis,
            maintainAspectRatio: false,
            aspectRatio: 0.8,
        };
    }
}
