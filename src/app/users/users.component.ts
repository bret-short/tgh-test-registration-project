import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../registration-form/registration-form.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
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
      next: (response) => {
        if (response.success) {
          this.users = response.payload as User[];
        } else {
          this.toastr.error('Failed to get users', 'Error', {
            positionClass: 'toast-top-center',
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error('Failed to get users', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.log(error.message, error.error);
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
      error: (error: HttpErrorResponse) => {
        this.toastr.error('Failed to delete user', 'Error', {
          positionClass: 'toast-top-center toast-container',
        });
        console.log(error.message, error.error);
      },
    });
  }
}
