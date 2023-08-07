import { Component, OnInit , Input, ChangeDetectorRef,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-admin-pie-chart',
  templateUrl: './admin-pie-chart.component.html',
  styleUrls: ['./admin-pie-chart.component.scss']
})
export class AdminPieChartComponent implements OnInit{
  @Input() result:any;
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
    console.log(this.result)
    this.data = {
      labels: this.result.label,
      datasets: [
        {
          data: this.result.data, 
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
