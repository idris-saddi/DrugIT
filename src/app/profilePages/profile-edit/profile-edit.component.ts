import { Component, OnInit } from '@angular/core';
import { users } from 'src/constants';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  id = 1;
  user : any;

  ngOnInit(): void {
    this.user = users.find(user => user.id === this.id);
  }
}
