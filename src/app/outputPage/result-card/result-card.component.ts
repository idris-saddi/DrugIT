import { Component, Input, OnInit } from '@angular/core';
import { molecules, targets } from 'src/constants';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {
  
  @Input() result: any;
  molecule : any;
  target : any;
  angle = 0;

  ngOnInit(): void {
    this.angle = this.result.confidence * 180 / 100;
    this.molecule = molecules.find(molecule => molecule.id === this.result.moleculeId);
    this.target = targets.find(target => target.id === this.result.targetId);
    console.log(this.result.moleculeId);
    console.log(this.molecule);
  }

  getClassSpan() {
    if (this.result.active) {
      return 'blue';
    } else {
      return 'yellow';
    }
  }

  getClassSpan2() {
    if (this.result.active) {
      return 'text-success';
    } else {
      return 'text-warning';
    }
  }
}
