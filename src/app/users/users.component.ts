import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  accessCode: string = '449732';

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.accessCode).subscribe({
      next: (response: any) => {
        this.users = response.payload;
        console.log('HERE', this.users);
      },
      error: (error: any) => {
        console.log('Error fetching users', error);
      },
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(this.accessCode, userId).subscribe({
      next: (response: any) => {
        console.log('User deleted', response);
        this.toastr.success(`User ${userId} deleted successfully.`, 'Success'),
          { positionClass: 'toast-top-center' };
        this.getUsers();
      },
      error: (error) => {
        this.toastr.error('Failed to delete user', 'Error', {
          positionClass: 'toast-top-center toast-container',
        });
      },
    });
  }
}
