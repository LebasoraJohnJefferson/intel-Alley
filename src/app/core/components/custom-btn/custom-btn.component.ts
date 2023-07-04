import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-btn',
  templateUrl: './custom-btn.component.html',
  styleUrls: ['./custom-btn.component.scss']
})
export class CustomBtnComponent {
  @Input() name:string = ''
  @Input() bgColor:string='bg-blue-400'
  @Input() bgColorHover:string='bg-blue-200'
  @Input() width:string = 'w-20'
  @Input() height:string = ''
  @Input() textColor:string = 'text-white'
  @Input() isLoading:boolean=true
  @Input() style:string = ''
  @Output() btnEmit:EventEmitter<boolean> = new EventEmitter()
  constructor(){
    
  }

  ngOnInit(){
    this.style = `
      rounded p-3 mx-2 font-bold
      ${this.textColor}
      ${this.bgColor}
      ${this.bgColorHover}
      ${this.width}
      ${this.height}
      ${this.textColor}`
  }

  btnClick(){
    this.btnEmit.emit(this.isLoading)
  }

}
