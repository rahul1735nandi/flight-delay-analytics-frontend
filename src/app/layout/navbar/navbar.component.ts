import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../pages/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  constructor(public router: Router, private dialog: MatDialog) {}

  logout(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '380px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }
}
