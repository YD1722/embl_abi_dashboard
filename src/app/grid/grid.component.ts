import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @Input() dataList: any[];
  @Input() columnsList: any[]; // TODO fix type here
  @Input() rowsPerPageOptions: any[];
  @Input() isLazyLoaded: boolean;
  @Input() totalRecords: number;
  @Input() rowsPerPage: number;
  @Output() rowSelectionChange = new EventEmitter();
  @Output() onRowDoubleClick = new EventEmitter();
  @Output() onLazyLoadData = new EventEmitter();

  selectedRow: any;

  constructor() {
    this.dataList = [];
    this.columnsList = [];
    this.isLazyLoaded = false;
    this.totalRecords = 0;
    this.rowsPerPageOptions = [10, 25, 50];
    this.rowsPerPage = 10;
  }

  ngOnInit(): void {}

  lazyLoadData(event: LazyLoadEvent) {
    if (event.rows != null && this.rowsPerPage !== event.rows) {
      this.rowsPerPage = event.rows;
    }

    if (event.first != null && event.rows != null) {
      const pageNumber = this.getPageNumber(event.first, event.rows);
      this.lazyLoadGridData(pageNumber, event.rows);

      this.onLazyLoadData.emit({
        pageNumber: pageNumber,
        rowsPerPage: event.rows,
      });
    }
  }

  onRowSelect() {
    this.rowSelectionChange.emit(this.selectedRow);
  }

  // TODO introduce common interface
  lazyLoadGridData(pageNumber: number, rowsPerPage: number) {}

  rowDoubleClick(data: any) {
    this.onRowDoubleClick.emit(data);
  }

  private getPageNumber(start: number, rowsPerPage: number) {
    return start / rowsPerPage + 1;
  }
}
