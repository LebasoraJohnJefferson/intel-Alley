import { Component } from '@angular/core';

@Component({
  selector: 'app-survey-content',
  templateUrl: './survey-content.component.html',
  styleUrls: ['./survey-content.component.scss']
})
export class SurveyContentComponent {
  fakeArray:Array<any> = new Array(10)
  survey:any = {
    question:'Which industry does our alumni network have the most representation in?',
    answer:{
      a:'Technology',
      b:' Healthcare',
      c:'Finance',
      d:'others'
    },
    response:{
      a:120,
      b:30,
      c:50,
      d:70
    }
  }


  title = "GFG";
  data = {
    labels: Object.values(this.survey.answer),
    datasets: [
      {
        data:  Object.values(this.survey.response),
        backgroundColor: ["#FF6384", 
                          "#36A2EB", 
                          "#ffA2EB", 
                          "#FFCE56"],
      },
    ],
  };
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position:'right',
          labels: {
          color: "#495057",
        },
      },
    },
  };
}
