import { Component } from '@angular/core';
import { FilesService } from '../../../shared/services/files.service';

@Component({
  selector: 'app-employed',
  templateUrl: './employed.component.html',
  styleUrls: ['./employed.component.scss']
})
export class EmployedComponent {
    files:any;
    isLoading:boolean = false

  constructor(
    private _filesService:FilesService
  ){
    this._filesService.getUserEmployed().subscribe({
      next:(res)=>{
        this.isLoading=true
        this.files = res
      },complete:()=>{
        this.isLoading=true
      }
    })
  }


}
