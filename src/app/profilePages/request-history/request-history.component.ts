import { Component, Input } from '@angular/core';
import { Request } from 'src/app/Model/Request';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent {
  @Input() data: any;

}
