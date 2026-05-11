import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminUserListResult, AdminUserQuery } from '../models/admin.user.model';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
  private readonly base = `${environment.apiUrl}/admin/users`;

  constructor(private http: HttpClient) {}

  getUsers(query: AdminUserQuery): Observable<AdminUserListResult> {
    let params = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize)
      .set('roleFilter', query.roleFilter)
      .set('accountStatusFilter', query.accountStatusFilter)
      .set('sortBy', query.sortBy);

    if (query.search?.trim()) {
      params = params.set('search', query.search.trim());
    }

    return this.http.get<AdminUserListResult>(this.base, { params });
  }
}