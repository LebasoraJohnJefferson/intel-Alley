import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute  } from '@angular/router'
import { QuestionsService } from '../../shared/services/questions.service';
import { OptionsService } from '../../shared/services/options.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  isSubmitLoading:boolean = false
  createAccountModal:boolean = false
  isSubmitOptionLoading:boolean = false
  isAddOptionOpen:boolean = false
  isOptionDeleting:number = -1
  questionIdTOBeEdited:number = -1
  optionToBeEditedById:number = -1
  questionIdForOption:number = -1
  surveyId:any;
  options:any = []
  reports:any = []

  fakeData:any = {
    data:[1,2,3,4],
    label:['try','try1','try2','try3']
  }


  createForm:FormGroup = this._formBuilder.group({
    context:['',Validators.required],
  })

  createOptionForm:FormGroup = this._formBuilder.group({
    context:['',Validators.required],
  })

  editOptionForm:FormGroup = this._formBuilder.group({
    context:['',Validators.required],
  })


  constructor(
    private _formBuilder:FormBuilder,
    public toast:HotToastService,
    private _routes:ActivatedRoute,
    private _questionService:QuestionsService,
    private _optionService:OptionsService,
    public location:Location
  ){
    this.surveyId = this._routes.snapshot.paramMap.get('surveyId');
    this.getQuestion()
  }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }

  
  ngSubmitEdit(){
    if(this.editOptionForm.invalid) return this.toast.warning("Empty Input")
    this._optionService.updateOption({...this.editOptionForm.value,optionId:this.optionToBeEditedById}).subscribe({
      next:(res)=>{
        this.toast.success(res.message)
        this.optionToBeEditedById = -1
        this.getAllOptionByQuestionId(this.questionIdForOption)
      },error:(err)=>{
        this.toast.warning(err.error.message)
        this.optionToBeEditedById = -1
      }
    })
  }

  openEditOptionForm(optionId:number){
    this.optionToBeEditedById = this.optionToBeEditedById == -1 ? optionId : -1
    let option = this.options.filter((opt:any)=>{ return opt.id == optionId})
    this.editOptionForm.controls['context'].setValue(option[0].context)
  }

  openOptionForm(questionId:number){
    this.getAllOptionByQuestionId(questionId)
    this.isAddOptionOpen = true
    this.questionIdForOption = questionId
  }

  getAllOptionByQuestionId(questionId:number){
    this._optionService.getOption(questionId).subscribe({
      next:(res)=>{
        this.options = res.options
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  
  deleteOption(optionId:number){
    this.isOptionDeleting = optionId
    this._optionService.deleteOption(optionId).subscribe({
      next:(res)=>{
        this.isOptionDeleting = -1
        this.getAllOptionByQuestionId(this.questionIdForOption)
        this.toast.success(res.message)
      },error:(error)=>{  
        this.isOptionDeleting = -1
        this.toast.warning(error.message)
      }
    })
  }


  onSubmitQuestion(){
    this.isSubmitOptionLoading = true
    if(this.createOptionForm.valid){
      this._optionService.createOption({...this.createOptionForm.value,questionId:this.questionIdForOption}).subscribe({
        next:(res)=>{
          this.toast.success(res.message)
          this.isSubmitOptionLoading = false
          console.log(res)
          this.createOptionForm.reset()
          this.getAllOptionByQuestionId(this.questionIdForOption)
        },error:(err)=>{
          this.toast.warning(err.error.message)
          this.isSubmitOptionLoading = false
        }
      })
    }else{
      this.toast.warning("Empty Input")
      this.isSubmitOptionLoading = false
    }
  }

  openForm(questionId:number){
    this.questionIdTOBeEdited = this.questionIdTOBeEdited == -1 ? questionId : -1
    this.createAccountModal = true
  }

  deleteQuestion(questionId:number){
    this._questionService.deleteQuestion(questionId).subscribe({
      next:(res)=>{
        this.toast.success("Successfully deleted!")
        this.getQuestion()
      },error:(err)=>{
        this.toast.error(err.error.message)
      }
    })
  }

  getQuestion(){
    this._questionService.getQuestion(this.surveyId).subscribe({
      next:(res)=>{
        this.reports = res.questions
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  onSubmit(){
    this.isSubmitLoading = true
    if(this.createForm.valid){
      if(this.questionIdTOBeEdited == -1){
        const newForm = {...this.createForm.value,surveyId:this.surveyId}
        this._questionService.createQuestion(newForm).subscribe({
          next:(res)=>{
            this.getQuestion()
            this.toast.success(res.message)
            this.isSubmitLoading = false
            this.createForm.reset()
          },error:(err)=>{
            this.toast.error(err.error.message)
            this.isSubmitLoading = false
          }
        })
      }else{
        const newForm = {...this.createForm.value,questionId:this.questionIdTOBeEdited}
        this._questionService.updateQuestion(newForm,this.surveyId).subscribe({
          next:(res)=>{
            this.toast.success(res.message)
            this.isSubmitLoading = false
            this.createForm.reset()
            this.createAccountModal = false
            this.getQuestion()
          },error:(err)=>{
            this.toast.error(err.error.message)
            this.isSubmitLoading = false
          }
        })
      }
    }else{
      this.toast.warning("Empty Input")
      this.isSubmitLoading = false
    }
  }

}
