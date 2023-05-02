import { Component} from '@angular/core';
import { results, molecules } from 'src/constants';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-output-page',
  templateUrl: './output-page.component.html',
  styleUrls: ['./output-page.component.css']
})
export class OutputPageComponent {
  smiles:string;
  constructor(private route: ActivatedRoute, router: Router,) { 
    this.smiles=""
    this.route.params.subscribe(params => {
      this.smiles = params['value'];
      console.log(this.smiles);
    });
  }

  id = 0;

  result= results[this.id];
  molecule = molecules.find(molecule => molecule.id === this.result.moleculeId);


}
