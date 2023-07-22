import { Component } from '@angular/core';
import { developersProfile } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  developers:any = developersProfile
}
