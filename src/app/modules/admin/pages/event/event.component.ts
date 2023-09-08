import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  event: any = [];
  eventId: any;
  defaultAlumniImage: string = '../../../../assets/images/student.png';
  defaultAdminImage: string = '../../../../assets/images/admin.png';
  isCommentSending:boolean = false
  commentForm = this._formBuilder.group({
    commentContext: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private toast: HotToastService,
    private eventService: EventsService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      this.eventId = value['id'];
    });

    this.getEvent();
  }

  getEvent() {
    this.eventService.getEvent(this.eventId).subscribe(
      (response: any) => {
        this.event = response;

        console.log(this.event);
      },
      (error: any) => {}
    );
  }

  deleteComment(commentId:number){
    this.eventService.deleteComment(commentId).subscribe({
      next:(res)=>{
        this.getEvent()
        this.toast.success('Successfully Deleted!');
      },error:(err)=>{
        this.toast.warning(err.error)
      }
    })
  }

  editComment(commentId:number){
    this.toast.warning("under construction")
  }

  postComment(eventId:number){
    if (this.commentForm.valid) {
      this.isCommentSending = true;
      this.eventService
        .postComment(this.commentForm.value, eventId)
        .subscribe({
          error: (err) => {
            console.log(err.error);
            this.isCommentSending = false;
          },
          next: (res) => {
            this.getEvent()
            this.isCommentSending = false;
            this.commentForm.reset();
          },
        });
    }
  }

  dateFormat(date: any) {
    return moment(date).fromNow();
  }

  goBack() {
    this.location.back();
  }

  deleteEvent() {
    const ans = confirm('Delete this Event?');

    if (!ans) return;

    this.eventService.deleteEvent(this.eventId).subscribe(
      (response: any) => {
        this.toast.success(response.message);

        this.goBack();
      },
      (error: any) => {
        this.toast.error(error.message);
      }
    );
  }
}
