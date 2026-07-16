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
import { forkJoin } from 'rxjs';

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

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngAfterViewInit(): void {
    this.airlineDelayData.sort = this.sort;
  }

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

   loadDashboard(): void {
    forkJoin({
      summary: this.dashboardService.getDashboardSummary(),
      monthlyDelay: this.dashboardService.getMonthlyDelay(),
      airlineDelay: this.dashboardService.getAirlineDelay(),
      airportDelay: this.dashboardService.getAirportDelay()
    }).subscribe({
      next: ({summary, monthlyDelay, airlineDelay, airportDelay}) => {
        console.log("forkjoin response ", summary, monthlyDelay, airlineDelay, airportDelay);
        this.hasDashboardError = false;
        this.dashboardSummary = summary;

        this.lineChartData.labels = monthlyDelay.map(item => this.getMonthName(item.month));
        this.lineChartData.datasets[0].data = monthlyDelay.map(item => item.Delay_Rate);
        this.lineChartData = {...this.lineChartData};

        this.airlineDelayData.data = airlineDelay;
        this.airportDelayData.data = airportDelay;
      },
      error: (error) => {
        console.error('Failed to load dashboard data ', error);
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
}
