import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
