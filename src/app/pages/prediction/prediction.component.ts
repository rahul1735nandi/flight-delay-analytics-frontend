import { Component } from '@angular/core';

import { PredictionService } from '../../services/prediction.service';
import { FlightPredictionRequest, PredictionResponse } from '../../models/prediction.model';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss'
})
export class PredictionComponent {

  formData: FlightPredictionRequest = {
    origin: 'JFK',
    dest: 'ATL',
    airline: 'DL',
    month: 7,
    day_of_week: 2,
    distance: 700,
    crs_dep_time: 900
  }

  predictionResult?: PredictionResponse;

  constructor(private predictionService: PredictionService) {}

  predictFlight():void {
    this.predictionService.predict(this.formData).subscribe({
      next: (response) => {
        console.log("Prediction response => ",response);
        this.predictionResult = response;

        // setTimeout(() => {
        //   this.predictionResult = undefined;
        // }, 10000)
      },
      error: (error) => {
        console.error(error);
        alert('Prediction Failed');
      }
    })
  }

  // closeResult(): void {
  //   this.predictionResult = undefined
  // }
}
