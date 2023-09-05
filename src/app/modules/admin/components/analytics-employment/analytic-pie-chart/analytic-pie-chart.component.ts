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
        const isNoTakers = this.data?.every((element:number) => element === 0)
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.info = {
            labels: !isNoTakers ? this.label : ['no data'],
            datasets: [
                {
                    data: !isNoTakers ?  this.data : [100],
                    backgroundColor: !isNoTakers ? this.color : ['#D7D7F1']
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
