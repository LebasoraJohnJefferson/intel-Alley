import { Component,Input,Output,EventEmitter } from '@angular/core';
import {Validators,FormGroup,FormControl} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AnswerService } from '../../shared/services/answer.service';


@Component({
  selector: 'app-custom-survey',
  templateUrl: './custom-survey.component.html',
  styleUrls: ['./custom-survey.component.scss']
})
export class CustomSurveyComponent {
  @Output() refreshSurvey: EventEmitter<any> = new EventEmitter
  @Input() toFillUp:any;
  selectedRatings: any[] = [];
  surveyForm!:FormGroup;
  isSurveySubmitted:boolean = false

  constructor(
    public toast:HotToastService,
    private _answerService:AnswerService
  ){

  }

  

  ngOnChanges(){
    const formControls:any = {}; 

    this.toFillUp.Questions.forEach((question:any) => {
      formControls[question.id] = new FormControl('',[Validators.required]);
    });

    this.surveyForm = new FormGroup(formControls);

  }

  changeRate(rowIndex: number, value: any) {
    this.selectedRatings[rowIndex] = [value];
  }


  submitSurvey(){
    this.isSurveySubmitted = true
    if(this.surveyForm.valid){
      this._answerService.postAnswer(this.surveyForm.value).subscribe({
        next:(res:any)=>{
          this.toast.success(res.message)
          this.refreshSurvey.emit()
          this.isSurveySubmitted = false
        },error:(err:any)=>{
          this.isSurveySubmitted = false
          this.toast.warning(err.message)
        }
      })
    }else{
      this.toast.warning("Pls answer all question")
      this.isSurveySubmitted = false
    }
  }

  reset(){
    this.surveyForm.reset()
  }


  

}
