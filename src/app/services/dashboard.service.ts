import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummary, AirlineDelay, AirportDelay, MonthlyDelay } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://127.0.0.1:8000/dashboard';

  constructor(private http: HttpClient) { }

  getDashboardSummary():Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`);
  }

  getMonthlyDelay():Observable<MonthlyDelay[]> {
    return this.http.get<MonthlyDelay[]>(`${this.apiUrl}/monthly-delay`);
  }

  getAirlineDelay():Observable<AirlineDelay[]> {
    return this.http.get<AirlineDelay[]>(`${this.apiUrl}/airline-delay`);
  }

  getAirportDelay():Observable<AirportDelay[]> {
    return this.http.get<AirportDelay[]>(`${this.apiUrl}/airport-delay`);
  }
}
