import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LazyLoadResponse} from '../../common/LazyLoadResponse';
import {Molecule} from '../molecule';
import {Settings} from '../../utils/settings';

@Injectable({
  providedIn: 'root',
})
export class MoleculeListService {
  constructor(public http: HttpClient) {}

  getMolecules(rowsPerPage: number, pageNumber?: number) {
    let url = `${Settings.baseUrl}/molecules?page_size=${rowsPerPage}`;

    if (pageNumber != null) {
      url += `&page=${pageNumber}`;
    }

    return this.http.get<LazyLoadResponse<Molecule>>(url);
  }
}
