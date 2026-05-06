import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/admin/auth`;

  constructor(private http: HttpClient) { }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload).pipe(
      tap((res: any) => {
        debugger
        if (res.success) {
          localStorage.setItem('token', res.data.accessToken);
          // localStorage.setItem('user', JSON.stringify(res.user));
        }
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}