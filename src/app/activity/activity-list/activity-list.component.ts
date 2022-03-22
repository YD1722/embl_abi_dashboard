import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityListService } from './activity-list.service';
import { Molecule } from '../../molecule/molecule';
import { MoleculeImageGeneratorService } from '../../common/services/molecule-image-generator.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  columnsList: any[];
  activityList: any[] = [];
  totalRecords = 0;
  moleculeId: number | undefined;
  rowsPerPageOptions = [5, 10, 15];
  rowsPerPage = 5;

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

    if (this.moleculeId !== undefined) {
      this.getActivityList(this.moleculeId, this.rowsPerPage).subscribe(
        (values) => {
          this.activityList = values.results;
          this.totalRecords = values.count;
        }
      );
    }
  }

  lazyLoadGridData(event: any) {
    let pageNumber = event.pageNumber;
    let rowsPerPage = event.rowsPerPage;

    if (this.moleculeId !== undefined) {
      {
        this.getActivityList(
          this.moleculeId,
          rowsPerPage,
          pageNumber
        ).subscribe((values) => {
          this.activityList = values.results;
        });
      }
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

  close() {
    this.dialogRef.close();
  }
}
