import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  students: any = [];
  courses: any = [];
  uploadFile:any;
  onLoadFile:any;
  createAccountModal: boolean = false;
  submitLoading: boolean = false;

  createForm!: FormGroup;

  cols: any[] = [];
  exportColumns: any[] = [];
  selectedStudents: any[] = [];

  constructor(
    private router: Router,
    private toast: HotToastService,
    private _eventService:EventsService
  ) {}

  importedStudents: any[] = [];

  ngOnInit(): void {
    this.getStudents();

    this.createForm = new FormGroup({
      eventName: new FormControl(''),
      image: new FormControl(''),
    });

    this.cols = [
      { field: 'StudentCredential.schoolId', header: 'Student ID' },
      { field: 'name', header: 'Name' },
      { field: 'StudentCredential.Course.acronym', header: 'Course' },
      { field: 'StudentCredential.section', header: 'Section' },
      { field: 'StudentCredential.year', header: 'Year' },
      { field: 'email', header: 'Email' },
    ];
  }

  getStudents() {
    // this.studentService.getStudents().subscribe(
    //   (response: any) => {
    //     this.students = response;
    //   },
    //   (error: any) => {}
    // );
  }

  
  uploadImage(event:any){
    if(event.target.files[0]){
      this.uploadFile = event.target.files[0]
    }
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.toast.warning('You must select an image');
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
      this.toast.warning("Only images are supported")
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.onLoadFile = `${reader.result}` 
		}
  }

  uploadEventImage(){
    let element: HTMLElement = document.querySelector('input[name="eventImage"]') as HTMLElement;
    if (element) element.click();
  }


  onSubmit() {
    if (this.createForm?.get('eventName')?.value == '' && this.createForm?.get('image')?.value=='') {
      this.toast.warning('Please fill out the fields with valid data.');
      return;
    }

    this._eventService.createEvent(this.uploadFile,this.createForm.value).subscribe({
      next:()=>{

      },error:()=>{
        
      }
    })

    this.submitLoading = true;
  }
}