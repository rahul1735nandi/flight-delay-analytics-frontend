import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  hidePassword = true;
  hideConfirmPassword = true;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  register(): void {
    this.errorMessage = '';
    if(this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    this.authService.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        alert(response.message);
        this.router.navigate(['/login'])
      },
      error: (error) => {
        this.errorMessage = error.error?.detail || 'Registration failed';
      }
    });
  }
}
