import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() result: Array<number> = [];
  data: any = {};
  chartOptions: any = {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.chartView();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['result']) {
      this.chartView();
    }
  }

  chartView() {
    this.data = {
      labels: ['poorly', 'fairly', 'highly', 'very highly'],
      datasets: [
        {
          data: this.result, 
          backgroundColor: ["#FF6384", "#36A2EB", "#ffA2EB", "#FFCE56"],
        },
      ],
    };
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: "#495057",
          },
        },
      },
    };
    // Ensure to trigger change detection manually when data is updated
    this.cdr.detectChanges();
  }
}
