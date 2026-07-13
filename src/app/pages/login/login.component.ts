import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';
  hidePassword = true;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {}

  login(): void {
    this.errorMessage = '';
    this.loadingService.show();
    this.authService.login({
      email: this.email,
      password: this.password
    })
    .pipe(
      finalize(() => this.loadingService.hide())
    )
    .subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('user', response.email);
        this.notificationService.success('✅ Login successful!')
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loadingService.hide();
        this.errorMessage = error?.error?.detail || 'Invalid email or password';
        this.notificationService.error('❌ Invalid email or password')
      }
    })
  }
}
