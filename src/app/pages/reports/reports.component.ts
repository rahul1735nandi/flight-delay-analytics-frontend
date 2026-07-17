import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';
import { AirportDelay } from '../../models/dashboard.model';
import { MatSort } from '@angular/material/sort';
import { PredictionHistoryService } from '../../services/prediction-history.service';
import { LoadingService } from '../../services/loading.service';
import { PredictionHistory } from '../../models/prediction.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit, AfterViewInit {

  constructor(
    private dashboardService: DashboardService,
    private predictionHistoryService: PredictionHistoryService,
    public loadingService: LoadingService
  ) {}

  displayedColumns: string[] = [
    'origin',
    'Total_Flights',
    'Delayed_Flights',
    'Delay_Rate'
  ];

  historyDisplayedColumns: string[] = [
  'origin',
  'destination',
  'airline',
  'month',
  'day_of_week',
  'distance',
  'crs_dep_time',
  'prediction',
  'delay_probability',
  'prediction_time'
];

  dataSource = new MatTableDataSource<AirportDelay>();
  predictionHistoryDataSource = new MatTableDataSource<PredictionHistory>();
  hasAirportDelayError = false;
  hasPredictionHistoryError = false;
  private _paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('historySort') historySort!: MatSort;
  @ViewChild(MatPaginator)

  set paginator(value: MatPaginator) {
    if (value) {
      this._paginator = value;
      this.dataSource.paginator = value;
    }
  }

  ngOnInit(): void {
    this.loadAirportDelay();
    this.loadPredictionHistory();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.predictionHistoryDataSource.sort = this.historySort;
  }

  loadAirportDelay(): void {
    this.dashboardService.getAirportDelay().subscribe({
      next: (response) => {
        console.log("Airport Delay Response ", response);
        this.hasAirportDelayError = false;
        this.dataSource.data = response;
      },
      error: (error) => {
        console.error('Failed to load airport delay data ', error);
        this.hasAirportDelayError = true;
      }
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMonthName(month: number): string {
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
    return months[month - 1];
  }

  getDayName(day: number): string {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    return days[day - 1];
  }

  formatTime(time: number): string {
    const timeString = time.toString().padStart(4, '0');
    let hours = parseInt(timeString.substring(0, 2));
    const minutes = timeString.substring(2, 4);
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    if(hours === 0) {
      hours = 12;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
  }

  loadPredictionHistory(): void {
    this.predictionHistoryService.getPredictionHistory().subscribe({
      next: (response) => {
        this.hasPredictionHistoryError = false;
        console.log("Prediction History", response);
        this.predictionHistoryDataSource.data = response;

        if(this.historySort) {
          this.predictionHistoryDataSource.sort = this.historySort;
        }
      },
      error: (error) => {
        console.error("Failed to load prediction history", error);
        this.hasPredictionHistoryError = true;
      }
    })
  }
}
