import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  object!: string;
  email! : string;
  message! : string;
  isDialogOpen = false;
  widthOfDialog = '300px';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    if(this.isDialogOpen) return;
    
    if(window.innerWidth > 500) {
      this.widthOfDialog = (window.innerWidth -200) + 'px';
    }
    const dialogRef = this.dialog.open(ContactComponent, {
      width: this.widthOfDialog,
      data: { object: this.object, email: this.email, message: this.message }
    });
    this.isDialogOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      console.log('The dialog was closed', result);
      this.object = result.object;
      this.email = result.email;
      this.message = result.message;
    });
  }
}
