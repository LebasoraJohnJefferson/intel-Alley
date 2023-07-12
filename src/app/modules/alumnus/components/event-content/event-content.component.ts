import { Component,Input } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


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
    private _formBuilder:FormBuilder
  ){

  }

  openComment(index:number){
    this.openCommentThroughIndex = index == this.openCommentThroughIndex ? -1 : index
  }
}
