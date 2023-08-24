import { Component,OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  basicData: any;
  basicOptions: any;
  @Input() female:number =0
  @Input() male:number = 0
  @Input() totalAlumni:number =0


  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
        labels: ['male', 'female', ],
        datasets: [
          { 
              data: [this.male, this.female],
              backgroundColor: [ 'rgba(75, 192, 192, 0.2)','rgba(255, 159, 64, 0.2)'],
              borderColor: [ 'rgb(75, 192, 192)','rgb(255, 159, 64)'],
              borderWidth: 1
          }
      ]
    };

    this.basicOptions = {
        
        plugins: {
            legend: {
              display:false,
              labels: {
                    color: textColor,
                }
            },title: {
              display: true,
              text: `Alumni info updates : ${this.totalAlumni}`, // Add your desired title here
              color: textColor,
              font: {
                size: 14
              }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
}
