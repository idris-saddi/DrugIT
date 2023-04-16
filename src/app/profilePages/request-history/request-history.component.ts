import { Component, Input, OnInit } from '@angular/core';
import { Request } from 'src/app/Model/Request';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css'],
})
export class RequestHistoryComponent implements OnInit {
  @Input() data: any;

  ngOnInit(): void {
    console.log('data from RequestHistoryComponent\n');
    console.log(this.data);
    console.log(this.data.requests);
  }
}
