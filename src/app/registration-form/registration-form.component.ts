import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';

interface User {
  accessCode: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  email?: string;
  phone?: string;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  // Declare properties to store form values
  firstName: string = '';
  lastName: string = '';
  middleInitial: string = '';
  email: string = '';
  phone: string = '';

  constructor(private registrationService: RegistrationService) {}

  registerUser() {
    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      middleInitial: this.middleInitial,
      email: this.email,
      phone: this.phone,
      accessCode: '449732',
    };

    this.registrationService.registerUser(user).subscribe({
      next: (response: any) => {
        // Check if the API call was successful
        if (response && response.success) {
          console.log('User registered successfully.', response.payload);
          // You can access additional data from the response.payload if needed
        } else {
          console.log(
            'Registration failed.',
            response.error || response.message
          );
        }
      },
      error: (error) => {
        console.error('Registration failed.', error); // Log error to console
        if (error instanceof ErrorEvent) {
          // A client-side error occurred. Handle it accordingly.
          console.error('Client-side error:', error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error('Server-side error:', error);
        }
      },
    });
  }

  cancelRegistration() {
    console.log('Registration canceled');
  }
}
