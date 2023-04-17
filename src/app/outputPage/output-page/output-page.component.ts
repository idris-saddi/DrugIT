import { Component } from '@angular/core';
import { results, molecules } from 'src/constants';

@Component({
  selector: 'app-output-page',
  templateUrl: './output-page.component.html',
  styleUrls: ['./output-page.component.css']
})
export class OutputPageComponent {
  id = 0;

  result= results[this.id];
  molecule = molecules.find(molecule => molecule.id === this.result.moleculeId);


}
