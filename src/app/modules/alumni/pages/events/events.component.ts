import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { HotToastService } from '@ngneat/hot-toast';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  defaultAlumniImage: string = '../../../../assets/images/student.png';
  defaultAdminImage: string = '../../../../assets/images/admin.png';
  @Input() isAdmin: boolean = false;
  @Input() isOwner: boolean = true;
  isCommentSending: boolean = false;
  isLoadingEvent: boolean = false;
  isCommentEdit: boolean = true;
  editCommentById: number = 0;
  eventId: number = -1;
  comments: any = [];
  events: any = [];

  openCommentThroughIndex: number = -1;
  commentForm = this._formBuilder.group({
    commentContext: ['', Validators.required],
  });
  commentEditForm = this._formBuilder.group({
    commentContext: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _eventService: EventService,
    public toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  openComment(index: number) {
    this.openCommentThroughIndex =
      index == this.openCommentThroughIndex ? -1 : index;
    if (this.openCommentThroughIndex != -1) this.getComment(index);
  }

  getEvents() {
    this.isLoadingEvent = true;
    this._eventService.getEvents().subscribe({
      next: (data: any) => {
        this.isLoadingEvent = false;
        this.events = data;
        console.log(data);
      },
      error: (err) => {
        this.isLoadingEvent = false;
        console.log(err.error);
      },
    });
  }

  getComment(eventId: number) {
    this.eventId = eventId;
    this._eventService.getComment(eventId).subscribe({
      next: (res) => {
        this.comments = res.comments;
      },
    });
  }

  deleteComment(commentId: number) {
    this._eventService.deleteComment(commentId).subscribe({
      next: (res) => {
        this.getComment(this.eventId);
        this.events = this.events.map((event: any) => {
          if (event.id === this.eventId) {
            event.commentCount -= 1;
          }
          return event;
        });
        this.toast.success('Successfully Deleted!');
      },
      error: (err) => {
        this.toast.warning(err.error.message);
      },
    });
  }

  editComment(commentId: number, commentContext: string) {
    this.editCommentById = commentId == this.editCommentById ? -1 : commentId;
    if (this.editCommentById != -1)
      this.commentEditForm.controls.commentContext.setValue(commentContext);
  }

  commitEditComment() {
    if (this.commentEditForm.invalid) return this.toast.warning('Empty Input');
    this._eventService
      .editComment(this.editCommentById, this.commentEditForm.value)
      .subscribe({
        next: (res) => {
          this.toast.success('Post successfully updated!');
          this.editCommentById = -1;
          this.getComment(this.eventId);
        },
        error: (err) => {
          console.log(err.error);
        },
      });
  }

  postComment(eventId: number) {
    if (this.commentForm.valid) {
      this.isCommentSending = true;
      this._eventService
        .postComment(this.commentForm.value, eventId)
        .subscribe({
          error: (err) => {
            console.log(err.error);
            this.isCommentSending = false;
          },
          complete: () => {
            if (this.openCommentThroughIndex != -1)
              this.getComment(this.openCommentThroughIndex);
            this.isCommentSending = false;
            this.commentForm.reset();
          },
          next: () => {
            this.events = this.events.map((event: any) => {
              if (event.id === eventId) {
                event.commentCount += 1;
              }
              return event;
            });
          },
        });
    }
  }

  likes(eventId: number) {
    this._eventService.likes(eventId).subscribe({
      next: () => {
        this.events = this.events.map((event: any) => {
          if (event.id === eventId) {
            if (event.userLikesEvent) {
              event.likeCount = event.userLikesEvent
                ? event.likeCount - 1
                : event.likeCount + 1;
            } else {
              event.likeCount = !event.userLikesEvent
                ? event.likeCount + 1
                : event.likeCount - 1;
            }
            event.userLikesEvent = !event.userLikesEvent;
          }
          return event;
        });
      },
      error: (error) => {
        console.error('Error while liking the event:', error);
      },
    });
  }

  dateFormat(date: any) {
    return moment(date).fromNow();
  }
}
