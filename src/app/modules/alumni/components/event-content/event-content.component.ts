import { Component,Input,OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.scss']
})
export class EventContentComponent implements OnInit{
  @Input() isAdmin:boolean = false
  @Input() isOwner:boolean = true
  isCommentSending:boolean = false
  eventId:number = -1
  events:any = []
  comments:any = []
  defaultAlumniImage:string = '../../../../assets/images/student.png'
  defaultAdminImage:string = '../../../../assets/images/admin.png'
  openCommentThroughIndex:number = -1
  commentForm=this._formBuilder.group({
    commentContext:['',Validators.required]
  })
  constructor(
    private _formBuilder:FormBuilder,
    private _eventService:EventService,
    public toast:HotToastService
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
    this.eventId = eventId
    this._eventService.getComment(eventId).subscribe({
      next:(res)=>{
        this.comments = res.comments
      }
    })
  }

  deleteComment(commendId:number){
    this._eventService.deleteComment(commendId).subscribe({
      next:(res)=>{
        this.getComment(this.eventId)
        this.toast.success("Successfully Deleted!")
      },error:(err)=>{
        this.toast.warning(err.error.message)
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
