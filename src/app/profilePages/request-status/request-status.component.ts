import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent {
  @Input() req: any;
  
}
