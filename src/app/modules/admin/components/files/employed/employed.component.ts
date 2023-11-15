import { Component } from '@angular/core';
import { FilesService } from '../../../shared/services/files.service';
import { ActivatedRoute  } from '@angular/router'


@Component({
  selector: 'app-employed',
  templateUrl: './employed.component.html',
  styleUrls: ['./employed.component.scss']
})
export class EmployedComponent {
    files:any;
    isLoading:boolean = false
    status:any;
    tempFile:any

  constructor(
    private _filesService:FilesService,
    public routes:ActivatedRoute
  ){
    this.status = this.routes.snapshot.paramMap.get('status')
    this._filesService.getUserEmployment(this.status).subscribe({
      next:(res)=>{
        this.files = res
        this.tempFile = res
        this.isLoading=true
      },complete:()=>{
        this.isLoading=true
      }
    })
  }

  searchFile(event:any){
    const search = event.target.value
    this.files =  this.tempFile.filter((entry:any)=>entry?.User?.name.toLowerCase().includes(search))
  }


}
