import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private toast: HotToastService,
    private eventService: EventsService
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
