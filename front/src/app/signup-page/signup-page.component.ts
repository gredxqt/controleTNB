import { Component } from '@angular/core';
import { User } from '../entitiy/User';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  salary: any;
  dateSalary: any;
  amount: any;

  constructor(
    private router: Router,
    private httpService: UserService,
  ) {} // Inject Router in the constructor
  onSubmit() {
    const user: User = {
      id: 0,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      salary: this.salary,
      dateSalary: new Date(),
      amount: this.amount,
      accounts: [],
      setting: undefined,
    };

    this.httpService.addUser(user).subscribe(
      (response) => {
        // Handle success response
        console.log('User added successfully:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle error response
        console.error('Error adding user:', error);
      },
    );
  }
}
