import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-analytic-pie-chart',
  templateUrl: './analytic-pie-chart.component.html',
  styleUrls: ['./analytic-pie-chart.component.scss']
})
export class AnalyticPieChartComponent {
  info: any;
  @Input() label:any = []
  @Input() data:any = []
  @Input() color:any = []

    options: any;

    constructor(){

    }

    ngOnChanges() {
        this.viewChart()
    }

    viewChart(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.info = {
            labels: this.label,
            datasets: [
                {
                    data: this.data,
                    backgroundColor: this.color
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    position:'bottom',
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            },
        }
    }
}
