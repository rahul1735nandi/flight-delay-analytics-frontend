import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FlightPredictionRequest, PredictionResponse } from '../models/prediction.model';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://127.0.0.1:8000/predict';

  constructor(private http: HttpClient) { }

  predict(data: FlightPredictionRequest): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(this.apiUrl, data);
  }
}
