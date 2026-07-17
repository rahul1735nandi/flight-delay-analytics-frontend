import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { PredictionHistory } from '../models/prediction.model';

@Injectable({
  providedIn: 'root'
})
export class PredictionHistoryService {
  private apiUrl = 'http://127.0.0.1:8000/prediction-history';
  private predictionHistory$?: Observable<PredictionHistory[]>;
  private predictionHistoryDirty = true;

  constructor(private http: HttpClient) { }

  getPredictionHistory(): Observable<PredictionHistory[]> {
    if(!this.predictionHistoryDirty && this.predictionHistory$) {
      return this.predictionHistory$;
    }
    this.predictionHistory$ = this.http.get<PredictionHistory[]>(this.apiUrl).pipe(shareReplay(1));
    this.predictionHistoryDirty = false;
    return this.predictionHistory$;
  }

  invalidPredictionHistoryCache(): void {
    this.predictionHistoryDirty = true;
  }
}
