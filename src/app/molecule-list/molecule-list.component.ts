import {Component, OnInit} from '@angular/core';
import {MoleculeListService} from './molecule-list.service';
import {Molecule} from './molecule';
import {MatDialog} from '@angular/material/dialog';
import {ActivityListComponent} from '../activity-list/activity-list.component';
import {Column} from '../grid/column';

@Component({
  selector: 'app-molecule-list',
  templateUrl: './molecule-list.component.html',
})
export class MoleculeListComponent implements OnInit {
  DEFAULT_ROWS_PER_PAGE = 10

  moleculeList: Molecule[] = [];
  totalRecords = 0;
  columnsList: Column[];

  constructor(
    public moleculeListService: MoleculeListService,
    public dialog: MatDialog
  ) {
    this.columnsList = [
      {mapping_name: 'name', display_name: 'Name'},
      {mapping_name: 'max_phase', display_name: 'Max Phase'},
      {mapping_name: 'structure', display_name: 'Structure'},
      {mapping_name: 'inchi_key', display_name: 'InChI Key'},
    ];
  }

  ngOnInit(): void {
    this.moleculeListService.getMolecules(this.DEFAULT_ROWS_PER_PAGE).subscribe((molecules) => {
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
    this.dialog.open(ActivityListComponent, {
      height: '500px',
      width: '900px',
      data: {...molecule},
    });
  }
}
