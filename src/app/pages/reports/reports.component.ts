import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  displayedColumns: string[] = [
    'airport',
    'delay',
    'flights',
    'status'
  ];

  dataSource = [
    {
      airport: 'JFK',
      delay: '22%',
      flights: 4200,
      status: 'High'
    },
    {
      airport: 'LAX',
      delay: '18%',
      flights: 3800,
      status: 'Medium'
    },
    {
      airport: 'ORD',
      delay: '12%',
      flights: 2950,
      status: 'Low'
    },
    {
      airport: 'ATL',
      delay: '25%',
      flights: 5100,
      status: 'High'
    }
  ];
}
