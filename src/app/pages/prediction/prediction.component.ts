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
    origin: '',
    dest: '',
    airline: '',
    month: null as any,
    day_of_week: null as any,
    distance: null as any,
    crs_dep_time: null as any
  }

  months = MONTHS;
  daysOfWeek = DAYS_OF_WEEK;
  airports = AIRPORTS;
  airlines = AIRLINES;

  predictionResult?: PredictionResponse;

  constructor(private predictionService: PredictionService) {}

  predictFlight():void {
    this.predictionResult = undefined

    this.predictionService.predict(this.formData).subscribe({
      next: (response) => {
        console.log("Prediction response => ",response)
        this.predictionResult = response

        // setTimeout(() => {
        //   this.predictionResult = undefined;
        // }, 10000)
      },
      error: (error) => {
        console.error(error);
        alert(error?.error?.detail ?? 'Prediction Failed');
      }
    })
  }

  closeResult(): void {
    this.predictionResult = undefined
  }

  hasAirportConflict(): boolean {
    return !!(
      this.formData?.origin &&
      this.formData?.dest &&
      this.formData?.origin === this.formData?.dest
    )
  }

  showOriginError(originField: any): boolean {
    return originField?.touched && this.hasAirportConflict()
  }

  showDestinationError(destField: any): boolean {
    return destField?.touched && this.hasAirportConflict()
  }
}
