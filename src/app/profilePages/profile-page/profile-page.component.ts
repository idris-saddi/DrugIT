import { Component } from '@angular/core';
import { Status } from 'src/app/Model/status.enum';
import { users, molecules, requests } from 'src/constants';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  data = {
    user : users[0],
    molecules : molecules,
    requests : requests,
    numRequests : requests.length,
    acceptedRequests : requests.filter(req => req.status === Status.Succeeded),
  }
}
