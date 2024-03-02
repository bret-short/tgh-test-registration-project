import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface User {
  accessCode: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  email?: string;
  phone?: string;
  userId: number;
  isEnabled: boolean;
}

export interface RegistrationResponse {
  success: boolean;
  payload: {
    userID: number;
    firstName: string;
    middleInitial: string;
    lastName: string;
    email: string;
    phone: string;
    isEnabled: boolean;
    createDate: string;
    modifiedDate: string | null;
    accessCode: string;
  };
  message: string | null;
  error: any | null;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  firstName = '';
  lastName = '';
  middleInitial = '';
  email = '';
  phone = '';
  showLastNameError = false;
  showFirstNameError = false;
  emailValid = false;
  userId = 0;
  isEnabled = false;

  constructor(
    private registrationService: RegistrationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private emailPattern: RegExp =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  private phonePattern: RegExp = /^\d{10}$/;

  registerUser() {
    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      middleInitial: this.middleInitial,
      email: this.email,
      phone: this.phone,
      accessCode: '449732',
      userId: this.userId,
      isEnabled: this.isEnabled,
    };

    if (user.email && !this.checkEmailValidity(user.email)) {
      // Display an error message for invalid email
      this.toastr.error('Invalid email address.', 'Error');
      return;
    }

    if (user.phone && !this.checkPhoneNumberValidity(user.phone)) {
      this.toastr.error('Phone number must be 10 digit number.', 'Error');
      return;
    }

    this.registrationService.registerUser(user).subscribe({
      next: (response: any) => {
        const registrationResponse = response as RegistrationResponse;
        if (response.success) {
          const userId = registrationResponse.payload.userID;
          this.toastr.success(
            `User ${userId} registered successfully.`,
            'Success',
            { positionClass: 'toast-top-center' }
          );
          this.router.navigate(['/users']);
        } else {
          this.toastr.error('Registration failed.', 'Error');
        }
      },
      error: () => {
        this.toastr.error('Registration failed.', 'Error', {
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  isSubmitDisabled() {
    return !this.firstName.trim() || !this.lastName.trim();
  }

  checkLastNameValidity() {
    this.showLastNameError = !this.lastName.trim();
  }

  checkFirstNameValidity() {
    this.showFirstNameError = !this.firstName.trim();
  }

  checkEmailValidity(email: string): boolean {
    return this.emailPattern.test(email);
  }

  checkPhoneNumberValidity(phone: string): boolean {
    return this.phonePattern.test(phone);
  }

  cancelRegistration() {
    // Replace fields with empty strings when canceled
    this.firstName = '';
    this.lastName = '';
    this.middleInitial = '';
    this.email = '';
    this.phone = '';
  }
}
