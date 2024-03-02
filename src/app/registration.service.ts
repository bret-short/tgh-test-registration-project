import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './registration-form/registration-form.component';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'https://tgh-newhire-api.azurewebsites.net/api/User';

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, user, { headers });
  }
}
