import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/Model/status.enum';
import { molecules } from 'src/constants';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css'],
})
export class RequestStatusComponent implements OnInit {
  @Input() req: any;
  molecule: any;

  ngOnInit(): void {
    this.molecule = molecules.find((m) => m.id === this.req.moleculeId);
    console.log('data from RequestStatusComponent\n');
    console.log(this.req);
  }

  getClassSpan() {
    if (this.req.status === Status.Pending) {
      return 'bg-warning';
    } else if (this.req.status === Status.Succeeded) {
      return 'bg-success';
    } else {
      return 'bg-danger';
    }
  }
}
