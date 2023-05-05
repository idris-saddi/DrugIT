import { Component, Input } from '@angular/core';
import { Molecule } from 'src/app/Model/Molecule';

@Component({
  selector: 'app-molecule-info',
  templateUrl: './molecule-info.component.html',
  styleUrls: ['./molecule-info.component.css']
})
export class MoleculeInfoComponent {
  @Input() molecule: any;

}
