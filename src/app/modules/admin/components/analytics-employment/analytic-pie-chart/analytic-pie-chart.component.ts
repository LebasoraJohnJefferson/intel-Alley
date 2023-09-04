import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-analytic-pie-chart',
  templateUrl: './analytic-pie-chart.component.html',
  styleUrls: ['./analytic-pie-chart.component.scss']
})
export class AnalyticPieChartComponent implements OnInit{
  data: any;
  @Input() label:string [] = []

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: this.label,
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
}
