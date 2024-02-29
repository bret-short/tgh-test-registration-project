import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'https://tgh-newhire-api.azurewebsites.net/api/User';

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, user, { headers });
  }
}
