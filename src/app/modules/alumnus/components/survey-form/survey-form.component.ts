import { Component,OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

      

      generalInfo = this._formBuilder.group({
        address: ['', [Validators.required,Validators.email]],
        contactNumber:['',[Validators.required]],
        civilStatus:['',[Validators.required]],
        sex:['',[Validators.required]]
      });


      educationalBG = this._formBuilder.group({
        elementary:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required],
        }),
        secondary:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        }),
        tertiary:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        }),
        baccalaureate:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        }),
        master:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        }),
        doctorate:this._formBuilder.group({
          university:['',Validators.required],
          highLvl:['',Validators.required],
          yearGraduated:['',Validators.required]
        })
      });


      thirdFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
      fourthFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
      fifthFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });

      isEditable = false;

      constructor(private _formBuilder: FormBuilder) {}

      ngOnInit() {
        
      }

      checkForm(){
        console.log(this.educationalBG.value)
      }


}
