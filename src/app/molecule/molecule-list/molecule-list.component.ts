import { Component, OnInit } from '@angular/core';
import { MoleculeListService } from './molecule-list.service';
import { Molecule } from '../molecule';
import { MatDialog } from '@angular/material/dialog';
import { ActivityListComponent } from '../../activity/activity-list/activity-list.component';
import { Column } from '../../grid/column';
import { MoleculeImageGeneratorService } from '../../common/services/molecule-image-generator.service';
import { LazyLoadResponse } from '../../common/LazyLoadResponse';
import { Observer } from 'rxjs';
import { Settings } from '../../utils/settings';

@Component({
  selector: 'app-molecule-list',
  templateUrl: './molecule-list.component.html',
})
export class MoleculeListComponent implements OnInit {
  moleculeList: Molecule[] = [];
  totalRecords = 0;
  columnsList: Column[];
  isDataLoading = false;

  constructor(
    public moleculeListService: MoleculeListService,
    public dialog: MatDialog
  ) {
    this.columnsList = [
      { mapping_name: 'name', display_name: 'Name' },
      { mapping_name: 'max_phase', display_name: 'Max Phase' },
      { mapping_name: 'structure', display_name: 'Structure' },
      { mapping_name: 'inchi_key', display_name: 'InChI' },
    ];
  }

  ngOnInit(): void {
    this.loadMolecules(Settings.DEFAULT_ROWS_PER_PAGE, 1);
  }

  lazyLoadGridData(event: any) {
    let pageNumber = event.pageNumber;
    let rowsPerPage = event.rowsPerPage;

    this.loadMolecules(rowsPerPage, pageNumber);
  }

  loadMolecules(rowsPerPage: number, pageNumber: number) {
    this.isDataLoading = true;
    this.moleculeListService
      .getMolecules(rowsPerPage, pageNumber)
      .subscribe(this.getObserver());
  }

  showActivityDetails(molecule: Molecule) {
    this.dialog.open(ActivityListComponent, {
      height: '750px',
      width: '900px',
      data: { ...molecule },
    });
  }

  getObserver() {
    const observer = {
      next: (response: LazyLoadResponse<Molecule>) => {
        this.moleculeList = response.results;
        this.totalRecords = response.count;
      },
      error: () => {
        console.log('Error in loading molecules');
      },
      complete: () => {
        this.isDataLoading = false;
      },
    };

    return observer;
  }
}
