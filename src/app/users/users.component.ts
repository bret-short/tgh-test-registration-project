import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users: any[] = [
    {
      id: 1,
      firstName: 'Jim',
      middle: 'D',
      lastName: 'Halpert',
      email: 'jimhalpert@dunder.com',
      phone: 8019878999,
      enabled: true,
    },
  ];

  deleteUser() {
    console.log('User deleted');
  }
}
