import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-admin-pie-chart',
  templateUrl: './admin-pie-chart.component.html',
  styleUrls: ['./admin-pie-chart.component.scss']
})
export class AdminPieChartComponent implements OnInit {
  @Input() result: any;
  data: any = {};
  chartOptions: any = {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['result']) {
      this.chartView(this.result);
    }
  }

  chartView(result: any) {
    
    this.data = {
      labels: result.label,
      datasets: [
        {
          data: result.data, 
          backgroundColor: result.color,
        },
      ],
    };
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: result.color,
          },
        },
      },
    };
    this.cdr.detectChanges();
  }
}
