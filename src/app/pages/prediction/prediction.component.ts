import { Component } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { FlightPredictionRequest, PredictionResponse } from '../../models/prediction.model';
import { AIRLINES } from '../../constants/airlines';
import { AIRPORTS } from '../../constants/airports';
import { MONTHS } from '../../constants/months';
import { DAYS_OF_WEEK } from '../../constants/days';
import { PredictionHistoryService } from '../../services/prediction-history.service';

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
  hours: string[] = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, '0')
  );

  minutes: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  meridians = ['AM', 'PM'];
  selectedHour = '';
  selectedMinute = '';
  selectedMeridian = '';
  hasPredictionError = false;


  constructor(
    private predictionService: PredictionService,
    private predictionHistoryService: PredictionHistoryService
  ) {}

  predictFlight(): void {
    let hour = parseInt(this.selectedHour, 10);
    const minute = parseInt(this.selectedMinute, 10);
    if(this.selectedMeridian === 'AM') {
      if(hour === 12) {
        hour = 0;
      }
    }
    else {
      if(hour !==12) {
        hour += 12;
      }
    }
    this.formData.crs_dep_time = hour * 100 + minute;
    this.predictionResult = undefined;

    this.predictionService.predict(this.formData).subscribe({
      next: (response) => {
        console.log('Prediction response', response);
        this.hasPredictionError = false;
        this.predictionResult = response;
        this.predictionHistoryService.invalidPredictionHistoryCache();
      },
      error: (error) => {
        console.error(error?.error?.detail ?? 'Prediction Failed');
        this.hasPredictionError = true;
      }
    });
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
