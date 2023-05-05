import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Target } from 'src/app/Model/Target';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InputBoxService {
  targets: Target[] | undefined;

  constructor(private http: HttpClient) { }

  

  getTargets() : Target[] | undefined {
    this.http.get<Target[]>('http://localhost:3000/target/all').subscribe(
        (response) => {
          this.targets = response;
        },
        (error) => {
          console.error(error);
        }
    );
    return this.targets;
  }

  
  

}
