import { Component } from '@angular/core';

import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartOptions
} from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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

  // Monthly Delay Analytics Chart

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

    datasets: [
      {
        label: 'Delay Percentage',
        data: [12, 15, 18, 14, 20, 24],
        fill: true,
        tension: 0.4
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },

    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Delay %'
        }
      }
    }
  };

}