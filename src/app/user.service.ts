import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from './interfaces/generic-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://tgh-newhire-api.azurewebsites.net/api/User';

  constructor(private http: HttpClient) {}

  getUsers(accessCode: string) {
    const url = `${this.apiUrl}/${accessCode}`;
    return this.http.get<GenericResponse>(url);
  }
  deleteUser(accessCode: string, userId: number) {
    const url = `${this.apiUrl}/${userId}/${accessCode}`;
    return this.http.delete<GenericResponse>(url);
  }
}
