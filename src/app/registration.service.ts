import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './registration-form/registration-form.component';
import { GenericResponse } from './interfaces/generic-response.interface';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'https://tgh-newhire-api.azurewebsites.net/api/User';

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    return this.http.post<GenericResponse>(this.apiUrl, user);
  }
}
