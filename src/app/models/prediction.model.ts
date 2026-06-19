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
    is_delayed: number;
    prediction: string;
    delay_probability: number;
}