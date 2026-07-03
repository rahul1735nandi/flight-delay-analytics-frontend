import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';
import { AirportDelay } from '../../models/dashboard.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit, AfterViewInit {

  constructor(private dashboardService: DashboardService) {}

  displayedColumns: string[] = [
    'origin',
    'Total_Flights',
    'Delayed_Flights',
    'Delay_Rate'
  ];

  dataSource = new MatTableDataSource<AirportDelay>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadAirportDelay();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAirportDelay(): void {
    this.dashboardService.getAirportDelay().subscribe({
      next: (response) => {
        console.log("Airport Delay Response ", response);
        this.dataSource.data = response;
      },
      error: (error) => {
        console.error('Failed to load airport delay data ', error);
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
}
