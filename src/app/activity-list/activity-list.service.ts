import { Injectable } from '@angular/core';
import { MoleculeResponse } from '../molecule-list/MoleculeResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActivityListService {
  constructor(public http: HttpClient) {}

  getActivityList(moleculeId: number, rowsPerPage = 10, pageNumber?: number) {
    let url = `http://localhost:8000/activity/${moleculeId}?page_size=${rowsPerPage}`;

    if (pageNumber != null) {
      url += `&page=${pageNumber}`;
    }

    return this.http.get<MoleculeResponse>(url);
  }
}
