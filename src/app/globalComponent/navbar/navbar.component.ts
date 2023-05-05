import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  object!: string;
  email! : string;
  message! : string;
  isDialogOpen = false;
  widthOfDialog = '300px';
  isLoggedIn: boolean = !!localStorage.getItem('access_token');

  constructor(public dialog: MatDialog, private router:Router) {}
  ngOnInit(): void {
    if(localStorage.getItem('access_token')){
      console.log("loged in");
    }else{
      console.log("not loged in");
    }
    
  }

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

  logout() {
    localStorage.removeItem('access_token');
    this.isLoggedIn = !this.isLoggedIn;
    this.router.navigate(['/login']);
  }
}
