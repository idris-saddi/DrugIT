import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeInfoComponent } from './molecule-info.component';

describe('MoleculeInfoComponent', () => {
  let component: MoleculeInfoComponent;
  let fixture: ComponentFixture<MoleculeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoleculeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
