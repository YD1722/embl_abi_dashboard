import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoleculeResponse } from './MoleculeResponse';

@Injectable({
  providedIn: 'root',
})
export class MoleculeListService {
  constructor(public http: HttpClient) {}

  getMolecules(rowsPerPage = 10, pageNumber?: number) {
    let url = `http://localhost:8000/molecules?page_size=${rowsPerPage}`;

    if (pageNumber != null) {
      url += `&page=${pageNumber}`;
    }

    return this.http.get<MoleculeResponse>(url);
  }
}
