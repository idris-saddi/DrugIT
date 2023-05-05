import { Component, Input, OnInit } from '@angular/core';
import { Molecule } from 'openchemlib';
import { Router } from '@angular/router';
import { Target } from 'src/app/Model/Target';
import { targets } from 'src/constants';
import { InputBoxService } from './input-box.service';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],
})
export class InputBoxComponent implements OnInit{
  @Input() smiles: string;
  notValid: boolean;
  bruteFormulaDisplay: string;
  enableAtLoad: boolean;
  targets: Target[] | undefined;

  constructor(private _router: Router, private inputBoxService: InputBoxService) {
    this.smiles = '';
    this.enableAtLoad = false;
    this.bruteFormulaDisplay = '';
    this.notValid = false;
  }

  ngOnInit(): void {
  }

  getResults(){
    this._router.navigate(['/output',{value:this.smiles}])
  }

  convertSMILEStoBrute() : void {
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
