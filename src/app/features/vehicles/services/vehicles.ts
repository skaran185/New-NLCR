import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminVehicleListResponse, AdminVehicleQuery, ApproveVehicleRequest } from '../models/admin-vehicle.model';


@Injectable({ providedIn: 'root' })
export class AdminVehicleService {
  private readonly base = `${environment.apiUrl}/admin/vehicles`;

  constructor(private http: HttpClient) {}

  getVehicles(query: AdminVehicleQuery): Observable<AdminVehicleListResponse> {
    let params = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize)
      .set('statusFilter', query.statusFilter)
      .set('categoryFilter', query.categoryFilter)
      .set('approvalFilter', query.approvalFilter)
      .set('sortBy', query.sortBy);

    if (query.search?.trim()) {
      params = params.set('search', query.search.trim());
    }

    return this.http.get<AdminVehicleListResponse>(this.base, { params });
  }

  approveVehicle(
    vehicleId: string,
    request: ApproveVehicleRequest
  ): Observable<any> {
    return this.http.put(`${this.base}/${vehicleId}/approval`, request);
  }

  toggleFeatured(vehicleId: string, isFeatured: boolean): Observable<any> {
    return this.http.patch(`${this.base}/${vehicleId}/featured`, {
      isFeatured,
    });
  }

  getVehicleImages(vehicleId: string) {
  return this.http.get<any>(
    `${environment.apiUrl}/admin/vehicles/${vehicleId}/images`
  );
}

reviewVehicleImages(
  vehicleId: string,
  payload: any
) {
  return this.http.put(
    `${environment.apiUrl}/admin/vehicles/${vehicleId}/images/review`,
    payload
  );
}
}