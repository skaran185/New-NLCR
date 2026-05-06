import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { LookupType, LookupValue } from '../lookup.model';

@Injectable({ providedIn: 'root' })
export class LookupsService {

  private base = `${environment.apiUrl}/lookup`;

  constructor(private http: HttpClient) {}

  // 🔹 Get all lookup types
  getTypes(): Observable<LookupType[]> {
    return this.http.get<LookupType[]>(`${this.base}/types`).pipe(
      tap(res => console.log('Lookup Types:', res))
    );
  }

  // 🔹 Get values by typeCode
  getValues(typeCode: string): Observable<LookupValue[]> {
    return this.http.get<LookupValue[]>(
      `${this.base}/values/${typeCode}`
    ).pipe(
      tap(res => console.log(`Values for ${typeCode}:`, res))
    );
  }

}