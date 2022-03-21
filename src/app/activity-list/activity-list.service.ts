import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LazyLoadResponse} from '../utils/LazyLoadResponse';
import {Activity} from './activity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityListService {
  constructor(public http: HttpClient) {}

  getActivityList(
    moleculeId: number,
    rowsPerPage = 10,
    pageNumber?: number
  ): Observable<LazyLoadResponse<Activity>> {
    let url = `http://localhost:8000/activity/${moleculeId}?page_size=${rowsPerPage}`;

    if (pageNumber != null) {
      url += `&page=${pageNumber}`;
    }

    return this.http.get<LazyLoadResponse<Activity>>(url);
  }
}
