import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazyLoadResponse } from '../../common/LazyLoadResponse';
import { Activity } from '../activity';
import { Observable } from 'rxjs';
import { Settings } from '../../utils/settings';

@Injectable({
  providedIn: 'root',
})
export class ActivityListService {
  constructor(public http: HttpClient) {}

  getActivityList(
    moleculeId: number,
    rowsPerPage: number,
    pageNumber?: number
  ): Observable<LazyLoadResponse<Activity>> {
    let url = `${Settings.BASE_URL}/activity/${moleculeId}?page_size=${rowsPerPage}`;

    if (pageNumber != null) {
      url += `&page=${pageNumber}`;
    }

    return this.http.get<LazyLoadResponse<Activity>>(url);
  }
}
