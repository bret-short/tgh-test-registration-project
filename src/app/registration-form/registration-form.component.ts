import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  registerUser() {
    // Access form values using ngModel
    console.log('Form Values:', {
      firstName: this.firstName,
      lastName: this.lastName,
      middleInitial: this.middleInitial,
      email: this.email,
      phone: this.phone,
    });

    // Add further logic for user registration, such as calling a service or API
  }

  cancelRegistration() {
    console.log('Registration canceled');
  }

  // Declare properties to store form values
  firstName: string = '';
  lastName: string = '';
  middleInitial: string = '';
  email: string = '';
  phone: string = '';
}
