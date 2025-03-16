import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule
  ],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
      if (newPassword !== confirmPassword) {
        this.snackBar.open('New password and confirm password do not match.', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
        return;
      }
      this.authService.changePassword(currentPassword, newPassword).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Password changed successfully.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Password change failed. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }
}