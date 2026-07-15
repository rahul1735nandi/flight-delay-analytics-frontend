import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionHistoryService {
  private apiUrl = 'http://127.0.0.1:8000/prediction-history';

  constructor(private http: HttpClient) { }

  getPredictionHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
  }
}
