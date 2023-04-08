import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeDrawComponent } from './molecule-draw.component';

describe('MoleculeDrawComponent', () => {
  let component: MoleculeDrawComponent;
  let fixture: ComponentFixture<MoleculeDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoleculeDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculeDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
