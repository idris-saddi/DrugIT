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
  enableAtLoad: boolean;

  constructor() {
    this.smiles = '';
    this.enableAtLoad = false;
    this.bruteFormulaDisplay = '';
    this.notValid = false;
  }

  convertSMILEStoBrute() {
    this.enableAtLoad = true;
    try {
      if (this.smiles === '') {
        this.bruteFormulaDisplay = '';
        this.notValid = false;
        return;
      }
      const molecule = Molecule.fromSmiles(this.smiles);
      this.notValid = false;
      const regex = /([A-Z][a-z]*)(\d*)/g;
      this.bruteFormulaDisplay = molecule
        .getMolecularFormula()
        .formula.replace(
          regex,
          "<span class='atom'>$1</span><sub class='count'>$2</sub>"
        );
    } catch (e: any) {
      this.notValid = true;
      this.bruteFormulaDisplay = '';
      console.log(e.message.toString());
    }
    console.log(this.notValid);
  }

  
}
