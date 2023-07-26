import { Component,Input,OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.scss']
})
export class EventContentComponent implements OnInit{
  @Input() isAdmin:boolean = false
  @Input() isOwner:boolean = true
  isCommentSending:boolean = false
  events:any = []
  comments:any = []
  openCommentThroughIndex:number = -1
  commentForm=this._formBuilder.group({
    commentContext:['',Validators.required]
  })
  constructor(
    private _formBuilder:FormBuilder,
    private _eventService:EventService
  ){

  }

  ngOnInit(): void {
    this.getEvents()
  }

  openComment(index:number){
    this.openCommentThroughIndex = index == this.openCommentThroughIndex ? -1 : index
    if(this.openCommentThroughIndex!=-1) this.getComment(index)
  }

  getEvents(){
    this._eventService.getEvents().subscribe({
      next:(data:any)=>{
        console.log(data.events)
        this.events = data.events
      },error:(err)=>{
        console.log(err.error)
      }
    })
  }

  getComment(eventId:number){
    this._eventService.getComment(eventId).subscribe({
      next:(res)=>{
        this.comments = res.comments
        console.log(this.comments)
      }
    })
  }


  postComment(eventId:number){
    if(this.commentForm.valid){
      this.isCommentSending = true
      this._eventService.postComment(this.commentForm.value,eventId).subscribe({
        error:(err)=>{
          console.log(err.error)
          this.isCommentSending = false
        },complete:()=>{
          if(this.openCommentThroughIndex != -1) this.getComment(this.openCommentThroughIndex)
          this.isCommentSending = false
          this.commentForm.reset()
        }
      })
    }
  }
}
