import { Component } from '@angular/core';
import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'flight',
    'origin',
    'destination',
    'status'
  ];

  recentFlights = [
    {
      flight: 'DL102',
      origin: 'JFK',
      destination: 'LAX',
      status: 'Delayed'
    },
    {
      flight: 'AA205',
      origin: 'ORD',
      destination: 'ATL',
      status: 'On Time'
    },
    {
      flight: 'UA890',
      origin: 'SFO',
      destination: 'MIA',
      status: 'Delayed'
    },
    {
      flight: 'SW440',
      origin: 'SEA',
      destination: 'DEN',
      status: 'On Time'
    }
  ];

  // CHART DATA

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

    datasets: [
      {
        data: [12, 15, 18, 14, 20, 24],
        label: 'Delay Percentage',
        fill: true,
        tension: 0.4
      }
    ]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
}
