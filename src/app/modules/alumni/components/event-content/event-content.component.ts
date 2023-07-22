import { Component,Input } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.scss']
})
export class EventContentComponent {
  @Input() isAdmin:boolean = false
  @Input() isOwner:boolean = true
  openCommentThroughIndex:number = -1
  commentForm=this._formBuilder.group({
    comment:['',Validators.required]
  })
  constructor(
    private _formBuilder:FormBuilder,
    private _eventService:EventService
  ){

  }

  openComment(index:number){
    this.openCommentThroughIndex = index == this.openCommentThroughIndex ? -1 : index
  }


  comment(eventId:number){
    if(this.commentForm.valid){
      this._eventService.comment(this.commentForm.value,eventId).subscribe({
        complete:()=>{

        },
        error:()=>{

        },next:()=>{
          
        }
      })
    }
  }
}
