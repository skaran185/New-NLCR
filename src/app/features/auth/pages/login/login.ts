import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  form: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['admin', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? ''
    };

    this.auth.login(payload).subscribe({
      next: (res) => {
        if (!res.success) {
          this.toastr.error(res.message || 'Login failed', 'Error');
          return;
        }

        localStorage.setItem('token', res.data.accessToken);
        this.toastr.success('Welcome back!', 'Signed in');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toastr.error('Something went wrong. Please try again.', 'Error');
      }
    });
  }
}