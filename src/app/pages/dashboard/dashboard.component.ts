import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardSummary, AirlineDelay, AirportDelay } from '../../models/dashboard.model';

import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartOptions
} from 'chart.js';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private dashboardService: DashboardService) {}

  dashboardSummary?: DashboardSummary;
  airlineDelayData = new MatTableDataSource<AirlineDelay>();
  airportDelayData = new MatTableDataSource<AirportDelay>();
  hasDashboardError = false;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadDashboardSummary();
    this.loadMonthlyDelay();
    this.loadAirlineDelay();
    this.loadAirportDelay()
  }

  ngAfterViewInit(): void {
    this.airlineDelayData.sort = this.sort;
  }

  displayedColumns: string[] = [
    'op_unique_carrier',
    'Total_Flights',
    'Delayed_Flights',
    'Delay_Rate'
  ];
  airportDisplayedColumns: string[] = [
    'origin',
    'Total_Flights',
    'Delayed_Flights',
    'Delay_Rate'
  ]

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

  loadDashboardSummary(): void {
    this.dashboardService?.getDashboardSummary().subscribe({
      next: (response) => {
        console.log("Dashboard response", response);
        this.dashboardSummary = response;
      },
      error: (error) => {
        console.error('Failed to load dashboard summary', error);
        this.hasDashboardError = true;
      }
    })
  }

  loadMonthlyDelay(): void {
    this.dashboardService?.getMonthlyDelay().subscribe({
      next: (response) => {
        console.log("Monthly delay response", response);
        this.lineChartData.labels = response.map(item => this.getMonthName(item.month));
        this.lineChartData.datasets[0].data = response.map(item => item.Delay_Rate);
        console.log('Chart Labels:', this.lineChartData.labels);
        console.log('Chart Data:', this.lineChartData.datasets[0].data);
        this.lineChartData = {...this.lineChartData};
      },
      error: (error) => {
        console.error('Failed to load monthly delay data', error);
        this.hasDashboardError = true;
      }
    })
  }

  private getMonthName(month: number): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    return months[month - 1]
  }

  loadAirlineDelay(): void {
    this.dashboardService?.getAirlineDelay().subscribe({
      next: (response) => {
        console.log('Airline Delay Response', response);
        this.airlineDelayData.data = response;
      },
      error: (error) => {
        console.error('Failed to load airline delay data', error);
        this.hasDashboardError = true;
      }
    })
  }

  loadAirportDelay(): void {
    this.dashboardService?.getAirportDelay().subscribe({
      next: (response) => {
        console.log("Airport Delay Response ",response);
        this.airportDelayData.data = response;
      },
      error: (error) => {
        console.error('Failed to load airport delay data ', error);
        this.hasDashboardError = true;
      }
    })
  }

}