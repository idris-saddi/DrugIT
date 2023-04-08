import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as RDKit from '@rdkit/rdkit';


@Component({
  selector: 'app-molecule-draw',
  template: `<canvas id="canvas" #canvas></canvas>`,
  templateUrl: './molecule-draw.component.html',
  styleUrls: ['./molecule-draw.component.css']
})
export class MoleculeDrawComponent{
  // @ViewChild('canvas') 
  // canvasRef!: ElementRef<HTMLCanvasElement>;
  

  // ngAfterViewInit(): void {
  //   const smiles = 'CCO'; // replace with your SMILES string
  //   const mol = RDKit.Mol.fromSmiles(smiles);
  //   const drawer = new RDKit.Draw.MolDraw2DSVG(200, 200);
  //   drawer.drawMolecule(mol);
  //   const svg = drawer.getDrawingText();
  //   const canvas = this.canvasRef.nativeElement;
  //   const ctx = canvas.getContext('2d');
  //   const img = new Image();
  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0);
  //   };
  //   img.src = 'data:image/svg+xml;base64,' + btoa(svg);
  // }

}
