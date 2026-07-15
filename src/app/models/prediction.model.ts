export interface FlightPredictionRequest {
    origin: string;
    dest: string;
    airline: string;
    month: number;
    day_of_week: number;
    distance: number;
    crs_dep_time: number;
}

export interface PredictionResponse {
    is_delayed: boolean;
    prediction: string;
    delay_probability: number;
}

export interface PredictionHistory {
    origin: string;
    destination: string;
    airline: string;
    month: number;
    day_of_week: number;
    distance: number;
    crs_dep_time: number;
    prediction: string;
    delay_probability: number;
    prediction_time: string;
}