import { Component} from '@angular/core';
import { results, molecules } from 'src/constants';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-output-page',
  templateUrl: './output-page.component.html',
  styleUrls: ['./output-page.component.css']
})
export class OutputPageComponent {
  smiles:string;
  returned: any;
  constructor(private route: ActivatedRoute, router: Router, private http:HttpClient) { 
    this.smiles=""
    this.route.params.subscribe(params => {
      this.smiles = params['value'];
      console.log(this.smiles);
    });
  }

  async ngOnInit() {
    this.http.post<any>("http://localhost:8000/predict", {canonical_smiles:this.smiles}).subscribe((response: any) => {
      this.returned=response;
      console.log(response);
    });
    console.log(this.returned)
  }

  id = 0;

  result= results[this.id];
  molecule = molecules.find(molecule => molecule.id === this.result.moleculeId);


}
