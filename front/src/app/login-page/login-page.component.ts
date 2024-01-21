import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../entitiy/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'], // Fix: Use 'styleUrls' instead of 'styleUrl'
})
export class LoginPageComponent {
  email: any;
  password: any;
  goBack() {
    this.router.navigate(['/home']);
  }
  users!: User[];
  constructor(
    private router: Router,
    private httpService: UserService,
  ) {} // Inject Router in the constructor
  ngOnInit() {
    this.httpService.allUsers().subscribe((data) => {
      this.users = data;
    });
  }
  onSubmit() {
    console.log('email: ' + this.email);
    console.log('Submit button clicked');
    console.log(this.users);
    const user = this.users.find(
      (u) =>
        u.email.toString() === this.email.toString() &&
        u.password.toString() === this.password.toString(),
    );
    console.log('user: ' + user);
    console.log('password: ' + this.password);
    if (user) {
      console.log('Email and password pair exist in users');
      this.router.navigate(['/dashboard/overview']);
    } else {
      console.log('Email and password pair do not exist in users');
    }
  }
}
