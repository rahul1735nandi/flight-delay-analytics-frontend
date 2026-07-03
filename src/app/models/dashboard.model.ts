export interface DashboardSummary {
    total_flights: number;
    delayed_flights: number;
    on_time_flights: number;
    delay_rate: number;
    average_delay: number;
    total_airlines: number;
    total_airports: number;
}

export interface MonthlyDelay {
    month: number;
    Total_Flights: number;
    Delayed_Flights: number;
    Delay_Rate: number;
}

export interface AirlineDelay {
    op_unique_carrier: string;
    Total_Flights: number;
    Delayed_Flights: number;
    Delay_Rate: number;
}

export interface AirportDelay {
    origin: string;
    Total_Flights: number;
    Delayed_Flights: number;
    Delay_Rate: number;
}
