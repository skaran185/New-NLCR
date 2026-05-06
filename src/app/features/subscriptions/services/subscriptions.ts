
// subscriptions.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// subscription-plan.model.ts
export interface SubscriptionPlan {
  id: string;
  planCode: string;
  planName: string;
  maxVehicleListings: number;
  trialDays: number | null;
  monthlyFee: number | null;
  annualFee: number | null;
  hasFeaturedListing: boolean;
  displayOrder: number;
  isFree: boolean;
  isPurchasable: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  errorCode: string;
  message: string;
  data: T;
  errors: any | null;
  pagination: any | null;
  traceId: string;
  timestamp: string;
  developerDetail: any | null;
}


@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private readonly baseUrl = environment.apiUrl+'/admin/subscription-plans';

  constructor(private http: HttpClient) {}

  getHostSubscriptionPackages(): Observable<ApiResponse<SubscriptionPlan[]>> {
    return this.http.get<ApiResponse<SubscriptionPlan[]>>(
      `${this.baseUrl}`
    );
  }

  // Stubbed for future CRUD — wire these up as backend endpoints are ready

  createPlan(payload: Partial<SubscriptionPlan>): Observable<ApiResponse<SubscriptionPlan>> {
    return this.http.post<ApiResponse<SubscriptionPlan>>(
      `${this.baseUrl}/host-subscription-packages`,
      payload
    );
  }

  updatePlan(id: string, payload: Partial<SubscriptionPlan>): Observable<ApiResponse<SubscriptionPlan>> {
    return this.http.put<ApiResponse<SubscriptionPlan>>(
      `${this.baseUrl}/host-subscription-packages/${id}`,
      payload
    );
  }

  deletePlan(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.baseUrl}/host-subscription-packages/${id}`
    );
  }

  getPlanById(id: string): Observable<ApiResponse<SubscriptionPlan>> {
    return this.http.get<ApiResponse<SubscriptionPlan>>(
      `${this.baseUrl}/host-subscription-packages/${id}`
    );
  }
}
