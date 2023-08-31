import { Component } from '@angular/core';
import { FilesService } from '../../../shared/services/files.service';
import { ActivatedRoute  } from '@angular/router'

@Component({
  selector: 'app-employed-files',
  templateUrl: './employed-files.component.html',
  styleUrls: ['./employed-files.component.scss']
})
export class EmployedFilesComponent {
  isLoading:boolean = true
  userId:any=-1;
  filesInfo:any;
  constructor(
    private _filesService:FilesService,
    public routes:ActivatedRoute
  ){
    this.userId = this.routes.snapshot.paramMap.get('userId')
    console.log(this.userId)
    this._filesService.getFiles(this.userId).subscribe({
      next:(res)=>{
        this.filesInfo = res
      }
    })
  }
}
