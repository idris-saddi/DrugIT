import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {
    this.email = '';
    this.password = '';
  }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    console.log(body);
    return this.http.post('http://localhost:3000/user/Login', body);
  }

  onLogin() {
    this.login(this.email, this.password).subscribe((response) => {
      // Handle the response from the server
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        console.log("SUCCESS LOGIN");
        this.router.navigate(['/home']);
      } else {
        console.log('Authentication failed');
      }
      console.log(response.token);
    }, (error) => {
      // Handle any errors that occur
      console.log("ERROR");
      console.log(error);
    });
  }
}
