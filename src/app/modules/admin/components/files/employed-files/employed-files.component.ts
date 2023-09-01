import { Component } from '@angular/core';
import { FilesService } from '../../../shared/services/files.service';
import { ActivatedRoute  } from '@angular/router'

@Component({
  selector: 'app-employed-files',
  templateUrl: './employed-files.component.html',
  styleUrls: ['./employed-files.component.scss']
})
export class EmployedFilesComponent {
  isLoading:boolean = false
  userId:any=-1;
  status:any;
  filesInfo:any;
  constructor(
    private _filesService:FilesService,
    public routes:ActivatedRoute
  ){
    this.userId = this.routes.snapshot.paramMap.get('userId')
    this.status = this.routes.snapshot.paramMap.get('status')
    this._filesService.getFiles(this.userId,this.status).subscribe({
      next:(res)=>{
        this.filesInfo = res
        this.isLoading =true
      },complete:()=>{
        this.isLoading =true
      }
    })
  }

  ngOnChanges(){
    
  }

}
