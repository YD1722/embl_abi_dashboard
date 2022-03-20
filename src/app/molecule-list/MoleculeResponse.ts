import { Molecule } from './molecule';

export interface MoleculeResponse {
  count: number;
  next: string;
  previous: string;
  results: Molecule[];
}
