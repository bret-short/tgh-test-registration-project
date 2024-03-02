import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../registration-form/registration-form.component';

interface UserResponse {
  payload: User[];
  success: boolean;
  message: string | null;
  error: any;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  accessCode = '449732';

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.accessCode).subscribe({
      next: (response: UserResponse) => {
        if (response.success) {
          this.users = response.payload;
        } else {
          this.toastr.error('Failed to get users', 'Error', {
            positionClass: 'toast-top-center',
          });
        }
      },
      error: () => {
        this.toastr.error('Failed to get users', 'Error', {
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(this.accessCode, userId).subscribe({
      next: () => {
        this.toastr.success(`User ${userId} deleted successfully.`, 'Success'),
          { positionClass: 'toast-top-center' };
        this.getUsers();
      },
      error: () => {
        this.toastr.error('Failed to delete user', 'Error', {
          positionClass: 'toast-top-center toast-container',
        });
      },
    });
  }
}
