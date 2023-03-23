import { Status } from './status.enum';

export class Molecule {
  id: number;

  userId: number;

  formula: string;
  status: Status;

  created_at: string;
  updated_at: string;
  deleted_at: string;

  constructor(
    id = 0,
    userId = 0,
    formula = '',
    status = Status.Pending,
    created_at = '',
    updated_at = '',
    deleted_at = ''
  ) {
    this.id = id;
    this.userId = userId;
    this.formula = formula;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
