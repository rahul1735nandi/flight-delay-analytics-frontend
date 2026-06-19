import { Component } from '@angular/core';

import { PredictionService } from '../../services/prediction.service';
import { FlightPredictionRequest, PredictionResponse } from '../../models/prediction.model';
import { AIRLINES } from '../../constants/airlines';
import { AIRPORTS } from '../../constants/airports';
import { MONTHS } from '../../constants/months';
import { DAYS_OF_WEEK } from '../../constants/days';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss'
})
export class PredictionComponent {

  formData: FlightPredictionRequest = {
    origin: 'ORD',
    dest: 'LGA',
    airline: 'AA',
    month: 7,
    day_of_week: 5,
    distance: 733,
    crs_dep_time: 1900
  }

  months = MONTHS;
  daysOfWeek = DAYS_OF_WEEK;
  airports = AIRPORTS;
  airlines = AIRLINES;

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

  closeResult(): void {
    this.predictionResult = undefined
  }
}
