import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoleculeImageGeneratorService {
  loadModule() {
    if (!this.isRdkLoaded()) {
      (window as any)
        .initRDKitModule()
        .then((RDKit: any) => ((window as any).RDKit = RDKit))
        .catch(() => {
          // TODO: Implement logger service
          console.log('error in loading RDKit module');
        });
    }
  }

  // TODO : Handle async data loading before get svg
  getSVG(structure: string) {
    if (this.isRdkLoaded()) {
      try {
        let smiles = structure;
        let mol = (window as any).RDKit.get_mol(smiles);
        let svg = mol.get_svg();

        return svg;
      } catch {
        console.log('Error in generating svg');
      }
    }
  }

  isRdkLoaded() {
    return (window as any).RDKit !== undefined;
  }
}
