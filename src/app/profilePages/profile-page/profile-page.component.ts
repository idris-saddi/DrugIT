import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Model/User';
import { Status } from 'src/app/Model/status.enum';
import { users, requests } from 'src/constants';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  link = 'http://localhost:3000/user/1';
  id = 1;

  // user : User | undefined ;
  // requests : Request[] | undefined;
  // numRequests : number | undefined;
  // acceptedRequests : number | undefined;
  data: any;
  constructor(
    private http:HttpClient
  ) { 
    this.data = {
      userf : this.getUser(),
      user : users.find(user => user.id === this.id),
      requests : requests.filter(req => req.userId === this.id),
      numRequests : requests.filter(req => req.userId === this.id).length,
      acceptedRequests : requests.filter(req => req.status === Status.Succeeded).length,
    }
  }

  getUser() : Observable<User> {
    return this.http.get<User>(this.link);
  }




  ngOnInit(): void {
    console.log("data from ProfilePageComponent\n");
    console.log(this.data);
  }
}
