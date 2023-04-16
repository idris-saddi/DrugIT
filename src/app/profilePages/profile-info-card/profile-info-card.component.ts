import { Component, Input } from '@angular/core';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.css']
})
export class ProfileInfoCardComponent {
  @Input() data: any;

  


}
