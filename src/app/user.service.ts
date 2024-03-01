// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://tgh-newhire-api.azurewebsites.net/api/User';

  constructor(private http: HttpClient) {}

  getUsers(accessCode: string): Observable<any> {
    const url = `${this.apiUrl}/${accessCode}`;
    return this.http.get(url);
  }
  deleteUser(accessCode: string, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}/${accessCode}`;
    return this.http.delete(url);
  }
}
