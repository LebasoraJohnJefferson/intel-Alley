import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-analytic-bar-chart',
  templateUrl: './analytic-bar-chart.component.html',
  styleUrls: ['./analytic-bar-chart.component.scss']
})
export class AnalyticBarChartComponent {
  @Input() indexAxis: any;
  @Input() label: any;
  @Input() info: any;
  data: any;
  options: any;

  constructor() {}

  ngOnChanges() {
    this.viewChart();
  }

  viewChart() {
    this.data = {
      labels: this.label,
      datasets: [
        {
          label: 'Count of User',
          backgroundColor: 'rgb(241, 69, 220, 0.8)',
          borderColor: 'rgba(247, 48, 13, 0.1)',
          data: this.info
        }
      ]
    };

    this.options = {
      indexAxis: this.indexAxis,
      maintainAspectRatio: false,
      aspectRatio: .9
    };
  }
}
