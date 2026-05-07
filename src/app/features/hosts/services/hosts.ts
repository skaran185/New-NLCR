import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, HostsFilter, HostsResponse, LookupItem, LookupResponse, ReadUrlResponse } from '../host.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HostsService {

  private base = `${environment.apiUrl}/admin/hosts`;

  constructor(private http: HttpClient) { }

  getHosts(filter: HostsFilter): Observable<HostsResponse> {
    let params = new HttpParams()
      .set('approvalStatus', filter.approvalStatus)
      .set('idProofStatus', filter.idProofStatus)
      .set('sortBy', filter.sortBy)
      .set('pageNumber', filter.pageNumber)
      .set('pageSize', filter.pageSize);

    if (filter.search?.trim()) {
      params = params.set('search', filter.search.trim());
    }

    return this.http.get<HostsResponse>(this.base, { params });
  }


  getApprovalStatusLookup(): Observable<LookupResponse> {
    return this.http.get<LookupResponse>(
      `${environment.apiUrl}/lookup/values/HOST_APPROVAL_STATUS`
    ).pipe(
      tap(res => console.log('Lookup response:', res))
    );
  }

  updateApprovalStatus(hostId: string, statusId: string, remarks: string): Observable<any> {
    return this.http.put(`${this.base}/${hostId}/approval`, { statusId, remarks });
  }

  getFileFromUrl(fileUrl: string): Observable<string> {
    const params = new HttpParams().set('fileUrl', fileUrl);

    return this.http
      .get<ApiResponse<ReadUrlResponse>>(
        `${environment.apiUrl}/storage/read-url`,
        { params }
      )
      .pipe(
        map(res => res?.data?.readUrl) // 👈 FINAL URL
      );
  }
}