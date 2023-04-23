import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {SmilesDrawer} from 'smiles-drawer';

@Component({
  selector: 'app-molecule-draw',
  templateUrl: './molecule-draw.component.html',
  styleUrls: ['./molecule-draw.component.css'],
})
export class MoleculeDrawComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor() {}

  ngOnInit(): void {
    try {
      const smilesDrawer = new SmilesDrawer();
      console.log('molecule', smilesDrawer);

      const ctx = this.canvas.nativeElement.getContext('2d');
      const molecule = 'CC(=O)O';
      
      smilesDrawer.draw(molecule, ctx, {
        width: this.canvas.nativeElement.width,
        height: this.canvas.nativeElement.height,
        bondThickness: 2,
        atomVisualization: 'balls',
      });

    } catch (e) {
      console.log('error', e);
    }

      
  }
}
