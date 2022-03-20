import { Component, OnInit } from '@angular/core';
import { MoleculeListService } from './molecule-list.service';
import { Molecule } from './molecule';
import { MatDialog } from '@angular/material/dialog';
import { ActivityListComponent } from '../activity-list/activity-list.component';

@Component({
  selector: 'app-molecule-list',
  templateUrl: './molecule-list.component.html',
})
export class MoleculeListComponent implements OnInit {
  moleculeList: Molecule[] = [];
  totalRecords = 0;
  columnsList: any[];

  constructor(
    public moleculeListService: MoleculeListService,
    public dialog: MatDialog
  ) {
    this.columnsList = [
      { mapping_name: 'name', display_name: 'Name' },
      { mapping_name: 'max_phase', display_name: 'Max Phase' },
      { mapping_name: 'structure', display_name: 'Structure' },
      { mapping_name: 'inchi_key', display_name: 'Inchi Key' },
    ];
  }

  ngOnInit(): void {
    // TODO: Default rows per page
    this.moleculeListService.getMolecules().subscribe((molecules) => {
      this.moleculeList = molecules.results;
      this.totalRecords = molecules.count;
    });
  }

  lazyLoadGridData(event: any) {
    let pageNumber = event.pageNumber;
    let rowsPerPage = event.rowsPerPage;

    this.moleculeListService
      .getMolecules(rowsPerPage, pageNumber)
      .subscribe((molecules) => {
        this.moleculeList = molecules.results;
      });
  }

  showActivityDetails(molecule: Molecule) {
    console.log(molecule);

    let dialogRef = this.dialog.open(ActivityListComponent, {
      height: '600px',
      width: '900px',
      data: { ...molecule },
    });
  }
}
