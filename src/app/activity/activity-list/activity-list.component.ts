import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityListService } from './activity-list.service';
import { Molecule } from '../../molecule/molecule';
import { MoleculeImageGeneratorService } from '../../common/services/molecule-image-generator.service';
import { Activity } from '../activity';
import { Column } from '../../grid/column';
import { LazyLoadResponse } from '../../common/LazyLoadResponse';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  columnsList: Column[];
  activityList: Activity[] = [];
  totalRecords = 0;
  moleculeId: number | undefined;
  rowsPerPageOptions = [5, 10, 15];
  rowsPerPage = 5;
  isDataLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Molecule,
    public dialogRef: MatDialogRef<ActivityListComponent>,
    public activityListService: ActivityListService,
    public imageGenerationService: MoleculeImageGeneratorService
  ) {
    this.columnsList = [
      { mapping_name: 'type', display_name: 'Type' },
      { mapping_name: 'units', display_name: 'Units' },
      { mapping_name: 'value', display_name: 'Value' },
      { mapping_name: 'relation', display_name: 'Relation' },
      { mapping_name: 'target_name', display_name: 'Target Name' },
      { mapping_name: 'target_organism', display_name: 'Target Organism' },
    ];
  }

  ngOnInit(): void {
    this.moleculeId = this.data.id;
    const moleculeStructure = this.data.structure;

    this.loadMoleculeStructure(moleculeStructure);
    this.loadActivities(this.rowsPerPage, 1);
  }

  lazyLoadGridData(event: any) {
    let pageNumber = event.pageNumber;
    let rowsPerPage = event.rowsPerPage;

    this.loadActivities(rowsPerPage, pageNumber);
  }

  loadActivities(rowsPerPage: number, pageNumber: number) {
    if (this.moleculeId !== undefined) {
      this.isDataLoading = true;

      this.getActivityList(this.moleculeId, rowsPerPage, pageNumber).subscribe(
        this.getObserver()
      );
    }
  }

  loadMoleculeStructure(structure: string) {
    const svg = this.imageGenerationService.getSVG(structure);

    // TODO: Enhance dom access
    if (svg !== undefined) {
      // @ts-ignore
      document.getElementById('molecule-structure').innerHTML = svg;
    }
  }

  getActivityList(
    moleculeId: number,
    rowsPerPage: number,
    pageNumber?: number
  ) {
    return this.activityListService.getActivityList(
      moleculeId,
      rowsPerPage,
      pageNumber
    );
  }

  getObserver() {
    const observer = {
      next: (response: LazyLoadResponse<Activity>) => {
        this.activityList = response.results;
        this.totalRecords = response.count;
      },
      error: () => {
        console.log('Error in loading activities');
      },
      complete: () => {
        this.isDataLoading = false;
      },
    };

    return observer;
  }

  close() {
    this.dialogRef.close();
  }
}
