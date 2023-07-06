import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
})
export class SurveysComponent implements OnInit {
  students: any = [];
  courses: any = [];

  createAccountModal: boolean = false;
  submitLoading: boolean = false;

  createForm!: FormGroup;

  constructor(
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getStudents();

    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      studentID: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  getStudents() {
    // this.studentService.getStudents().subscribe(
    //   (response: any) => {
    //     this.students = response;
    //   },
    //   (error: any) => {}
    // );
  }



  onSubmit() {
    if (!this.createForm.valid) {
      this.toast.warning('Please fill out the fields with valid data.');
      return;
    }

    this.submitLoading = true;

    // this.studentService.createStudentAccount(this.createForm.value).subscribe(
    //   (response: any) => {
    //     this.submitLoading = false;
    //     this.createForm.reset();
    //     this.createAccountModal = false;
    //     this.getStudents();
    //     this.toast.success(response.message);
    //   },
    //   (error: any) => {
    //     this.submitLoading = false;
    //     this.toast.error(error.error.message);
    //   }
    // );
  }



}