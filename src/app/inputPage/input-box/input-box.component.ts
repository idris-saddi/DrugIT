import { Component, Input } from '@angular/core';
import { Molecule } from 'openchemlib';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],
})
export class InputBoxComponent {
  @Input() smiles: string;
  notValid: boolean;
  bruteFormulaDisplay: string;

  constructor() {
    this.smiles = '';
    this.bruteFormulaDisplay = 'bruteFormula';
    this.notValid = false;
  }

  convertSMILEStoBrute() {
    try{
      if(this.smiles === ''){
        this.bruteFormulaDisplay = 'bruteFormula';
        this.notValid = false;
        return;
      }
      const molecule = Molecule.fromSmiles(this.smiles);
      this.notValid = false;
      const regex = /([A-Z][a-z]*)(\d*)/g;
      this.bruteFormulaDisplay = molecule.getMolecularFormula().formula.replace(regex, "<span class='atom'>$1</span><sub class='count'>$2</sub>");
    }catch(e: any){
      this.notValid = true;
      this.bruteFormulaDisplay = 'bruteFormula';
      console.log(e.message.toString());
    }
    console.log(this.notValid);

  }

}
