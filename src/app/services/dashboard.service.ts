import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { DashboardSummary, AirlineDelay, AirportDelay, MonthlyDelay } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://127.0.0.1:8000/dashboard';
  private dashboardSummary$?: Observable<DashboardSummary>;
  private monthlyDelay$?: Observable<MonthlyDelay[]>;
  private airlineDelay$?: Observable<AirlineDelay[]>;
  private airportDelay$?: Observable<AirportDelay[]>;

  constructor(private http: HttpClient) { }

  getDashboardSummary():Observable<DashboardSummary> {
    if(!this.dashboardSummary$) {
      this.dashboardSummary$ = this.http.get<DashboardSummary>(`${this.apiUrl}/summary`)
      .pipe(shareReplay(1));
    }
    return this.dashboardSummary$
  }

  getMonthlyDelay():Observable<MonthlyDelay[]> {
    if(!this.monthlyDelay$) {
      this.monthlyDelay$ = this.http.get<MonthlyDelay[]>(`${this.apiUrl}/monthly-delay`)
      .pipe(shareReplay(1));
    }
    return this.monthlyDelay$;
  }

  getAirlineDelay():Observable<AirlineDelay[]> {
    if(!this.airlineDelay$) {
      this.airlineDelay$ = this.http.get<AirlineDelay[]>(`${this.apiUrl}/airline-delay`)
      .pipe(shareReplay(1));
    }
    return this.airlineDelay$;
  }

  getAirportDelay():Observable<AirportDelay[]> {
    if(!this.airportDelay$) {
      this.airportDelay$ = this.http.get<AirportDelay[]>(`${this.apiUrl}/airport-delay`)
      .pipe(shareReplay(1));
    }
    return this.airportDelay$;
  }

  refreshAirportDelay(): void {
    this.airportDelay$ = undefined;
  }

  refreshDashboard(): void {
    this.dashboardSummary$ = undefined;
    this.monthlyDelay$ = undefined;
    this.airlineDelay$ = undefined;
    this.airportDelay$ = undefined;
  }
}
