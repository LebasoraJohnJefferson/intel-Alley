import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { read, utils, writeFile } from 'xlsx';

import { CourseService } from 'src/app/core/shared/services/course.service';
import { AlumniService } from '../../shared/services/alumni.service';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss'],
})
export class AlumniComponent implements OnInit {
  alumni: any = [];
  courses: any = [];
  deletedUsers:any= []
  createAccountModal: boolean = false;
  isShowDeletedUser: boolean = false;
  submitLoading: boolean = false;
  isRecovering:boolean = false
  loading:boolean = true
  isDeletingPermanent:boolean = false
  
  createForm!: FormGroup;
  occupationSeletionForm!: FormGroup;
  optionPDF:any=[]
  exportPDFSelectedOptions:any=[]
  

  cols: any[] = [];
  exportColumns: any[] = [];
  selectedStudents: any[] = [];

  constructor(
    private router: Router,
    private toast: HotToastService,
    private courseService: CourseService,
    private alumniService: AlumniService
  ) {}

  importedAlumni: any[] = [];

  ngOnInit(): void {
    this.getAlumni();
    this.getCourses();
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      studentId: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      yearGraduated: new FormControl('', [Validators.required]),
      password: new FormControl(''),
    });

    this.occupationSeletionForm = new FormGroup({
      occupation: new FormControl([],[Validators.required]),
    })

    this.cols = [
      { field: 'AlumniCredential.studentId', header: 'Student ID' },
      { field: 'name', header: 'Name' },
      { field: 'AlumniCredential.Course.acronym', header: 'Course' },
      { field: 'AlumniCredential.gradClass', header: 'Class' },
      { field: 'email', header: 'Email' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  retrieve(){
    this.isShowDeletedUser = true
    this.alumniService.getTemporaryDeletedUser().subscribe({
      next:(res)=>{
        this.deletedUsers = res
      }
    })
  }

  openPDFOptions(){
    let tempOccupArray:any = []
    this.alumni.forEach((data: any) => {
      const occupationClass = data?.IsSurveyTaken?.Employed?.occupClass;
      
      if (occupationClass && !tempOccupArray.some((item:any) => item.value === occupationClass)) {
        tempOccupArray.push({ label: occupationClass });
      }
    });
    this.optionPDF = tempOccupArray
  }

  deletePermanently(userId:number){
    this.isDeletingPermanent = true
    this.alumniService.deletePermanent(userId).subscribe({
      next:(res)=>{
        this.isDeletingPermanent = false
        this.retrieve()
        this.getAlumni()
        this.toast.success("Successfully Deleted!")
      },
      error:(err)=>{
        this.isDeletingPermanent = false
        this.toast.error(err)
      }
    })
  }

  recover(userId:number){
    this.isRecovering = true
    this.alumniService.recoverAccount(userId).subscribe({
      next:(res)=>{
        this.isRecovering = false
        this.retrieve()
        this.getAlumni()
        this.toast.success(res.message)
      },
      error:(err)=>{
        this.isRecovering = false
        this.toast.error(err)
      }
    })
  } 

  getCourses() {
    this.courseService.getAll().subscribe((response: any) => {
      this.courses = response;
    });
  }

  getAlumni() {
    this.alumniService.getAlumni().subscribe(
      (response: any) => {
        this.alumni = response;
        this.openPDFOptions()
        console.log(response)
      },
      (error: any) => {}
    );
  }

  handleImport($event: any) {
    const files = $event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.importedAlumni = rows;

          this.importStudents();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  importStudents() {
    this.alumniService.importAlumni({ alumni: this.importedAlumni }).subscribe(
      (response: any) => {
        setTimeout(() => {
          this.toast.success(response.message);
          this.getAlumni();
        }, 5000);
      },
      (error: any) => {
        this.toast.error(error.error.message);
      }
    );
  }

  onSubmit() {
    if (!this.createForm.valid) {
      this.toast.warning('Please fill out the fields with valid data.');
      return;
    }

    this.submitLoading = true;

    this.alumniService.create(this.createForm.value).subscribe(
      (response: any) => {
        this.submitLoading = false;
        this.createForm.reset();
        this.createAccountModal = false;
        this.getAlumni();
        this.toast.success(response.message);
      },
      (error: any) => {
        this.submitLoading = false;
        this.toast.error(error.error.message);
      }
    );
  }

  exportPdf() {
    const doc = new jsPDF('p', 'pt');

    let data: any = [];

    let columns = [
      { title: 'Student ID', dataKey: 'studentId' },
      { title: 'Name', dataKey: 'name' },
      { title: 'Email', dataKey: 'email' },

      {title: 'Gender',dataKey:'gender'},
      {title: 'Address',dataKey:'address'},
      {title: 'Organization',dataKey:'organization'},
      {title: 'Position',dataKey:'position'},

      { title: 'Course', dataKey: 'course' },
      { title: 'Year', dataKey: 'year' },
    ];
    const occupation = this.occupationSeletionForm.value?.occupation
  ? this.occupationSeletionForm.value?.occupation.map((data:any) => data.label)
  : [];
    this.alumni.map((item: any) => {
      let org;
      let position;

      org = item?.IsSurveyTaken?.Employed ? item?.IsSurveyTaken?.Employed?.orgName : item?.IsSurveyTaken?.SelfEmployed?.businessName
      position = item?.IsSurveyTaken?.SelfEmployed ? 'owner' : item?.IsSurveyTaken?.Employed?.workPosition 
      if(
        occupation.length == 0 ||
        occupation.includes(item?.IsSurveyTaken?.Employed?.occupClass)
        ){
        data.push({
          studentId: item.AlumniCredential?.studentId,
          name: item.name,
          email: item.email,
  
          gender:item?.IsSurveyTaken?.GeneralInfo?.sex ?? 'N/A',
          address:item?.IsSurveyTaken?.GeneralInfo?.address ?? 'N/A',
          organization:org ?? 'N/A',
          position:position ?? 'N/A',
  
  
          course: item.AlumniCredential?.Course?.acronym,
          year: item.AlumniCredential?.gradClass,
        });
      }
    });
    console.log(data)
    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg) => {
        doc.text('\nIntel Alley: Alumni', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('IntelAlley_Alumni.pdf');
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      let filteredAlumni  = this.alumni.map((alumData:any)=>{
        const { password, isDeleted, createdAt, updatedAt,AlumniCredential, ...rest } = alumData;
        return {...rest,"courseId":AlumniCredential?.Course?.id,"studentId":AlumniCredential.studentId,"gradClass":AlumniCredential.gradClass};
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'IntelAlley_Alumni');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      'Alumni_credentials' +
        '_export_' +
        new Date().getTime() +
        EXCEL_EXTENSION
    );
  }
}
