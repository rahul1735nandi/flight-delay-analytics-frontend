import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    this.errorMessage = '';

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('user', response.email);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error?.error?.detail || 'Invalid email or password';
      }
    })
  }
}
