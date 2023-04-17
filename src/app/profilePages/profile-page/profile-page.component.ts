import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/Model/status.enum';
import { users, requests } from 'src/constants';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  id = 1;

  data = {
    user : users.find(user => user.id === this.id),
    requests : requests.filter(req => req.userId === this.id),
    numRequests : requests.filter(req => req.userId === this.id).length,
    acceptedRequests : requests.filter(req => req.status === Status.Succeeded).length,
  }

  ngOnInit(): void {
    console.log("data from ProfilePageComponent\n");
    console.log(this.data);
  }
}
