export class Molecule {
  id: string;

  formula: string;

  molecularWeight: number;
  logP: number;
  numHDonors: number;
  numHAcceptors: number;
  pIC50: number;
  NumHeavyAtoms: number;
  numChiralCentersList: number;
  polarizabilities: number;
  numRings: number;
  rotableBonds: number;

  created_at: string;
  updated_at: string;
  deleted_at: string;

  constructor(
    id = '',
    formula = '',
    molecularWeight = 0,
    logP = 0,
    numHDonors = 0,
    numHAcceptors = 0,
    pIC50 = 0,
    NumHeavyAtoms = 0,
    numChiralCentersList = 0,
    polarizabilities = 0,
    numRings = 0,
    rotableBonds = 0,
    created_at = '',
    updated_at = '',
    deleted_at = ''
  ) {
    this.id = id;
    this.formula = formula;
    this.molecularWeight = molecularWeight;
    this.logP = logP;
    this.numHDonors = numHDonors;
    this.numHAcceptors = numHAcceptors;
    this.pIC50 = pIC50;
    this.NumHeavyAtoms = NumHeavyAtoms;
    this.numChiralCentersList = numChiralCentersList;
    this.polarizabilities = polarizabilities;
    this.numRings = numRings;
    this.rotableBonds = rotableBonds;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
