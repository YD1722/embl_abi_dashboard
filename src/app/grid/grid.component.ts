import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Column } from './column';
import { GridLazyLoadEvent } from './grid-lazy-load-event';
import { Settings } from '../utils/settings';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() dataList: any[];
  @Input() columnsList: Column[];
  @Input() rowsPerPageOptions: any[];
  @Input() isLazyLoaded: boolean;
  @Input() totalRecords: number;
  @Input() rowsPerPage: number;
  @Output() onRowDoubleClick = new EventEmitter();
  @Output() onLazyLoadData: EventEmitter<GridLazyLoadEvent> =
    new EventEmitter();

  selectedRow: any;

  constructor() {
    this.dataList = [];
    this.columnsList = [];
    this.isLazyLoaded = false;
    this.totalRecords = 0;
    this.rowsPerPageOptions = [10, 25, 50];
    this.rowsPerPage = Settings.DEFAULT_ROWS_PER_PAGE;
  }

  lazyLoadData(event: LazyLoadEvent) {
    if (event.rows != null && this.rowsPerPage !== event.rows) {
      this.rowsPerPage = event.rows;
    }

    if (event.first != null && event.rows != null) {
      const pageNumber = this.getPageNumber(event.first, event.rows);

      this.onLazyLoadData.emit({
        pageNumber: pageNumber,
        rowsPerPage: event.rows,
      });
    }
  }

  rowDoubleClick(data: any) {
    this.onRowDoubleClick.emit(data);
  }

  private getPageNumber(start: number, rowsPerPage: number): number {
    return start / rowsPerPage + 1;
  }
}
