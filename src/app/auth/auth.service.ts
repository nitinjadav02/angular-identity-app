import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7245/api/auth';  // Your ASP.NET Core API URL
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  register(fullName: string, email: string, phoneNumber: string, password: string, confirmPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ fullName, email, phoneNumber, password, confirmPassword });
    return this.http.post(`${this.apiUrl}/register`, body, { headers });
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, password });
    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { currentPassword, newPassword };
    return this.http.post(`${this.apiUrl}/change-password`, body, { headers });
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): Observable<string | null> { // Return Observable<string | null>
    const token = localStorage.getItem('access_token');
    return of(token); // Wrap in 'of' to make it an Observable
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    let token: string | null = null;
    this.getToken().subscribe(t => token = t);
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
