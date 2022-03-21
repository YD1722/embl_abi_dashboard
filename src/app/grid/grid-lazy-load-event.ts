import {LazyLoadEvent} from 'primeng/api';

export interface GridLazyLoadEvent extends Partial<LazyLoadEvent> {
  pageNumber: number;
  rowsPerPage: number;
}
