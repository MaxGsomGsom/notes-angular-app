import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../interfaces/login-user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent {
  userForm: LoginUser = new LoginUser();
  failedLogin: boolean;

  get loggedIn() {
    return this.userService.loggedIn;
  }


  constructor(private userService: UserService,
              private router: Router) { }

  login() {
    this.userService.login(this.userForm)
      .subscribe(res => res ?
        this.onSuccessLogin() :
        this.onFailLogin());
  }

  logout() {
    this.userService.logout()
      .subscribe(res => this.onLogout());
  }

  onSuccessLogin() {
    this.router.navigateByUrl('/');
  }

  onFailLogin() {
    this.failedLogin = true;
    setTimeout(() => this.failedLogin = false, 2000);
  }

  onLogout() {
    this.router.navigateByUrl('/');
  }
}

