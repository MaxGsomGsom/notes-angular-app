import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {
  failedLogin: boolean;
  userName: string;
  password: string;

  get loggedIn(): boolean {
    return !!this.userService.loggedIn;
  }

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    const userName = localStorage.getItem('userName');
    const password = localStorage.getItem('password');
    if (userName && password) {
      this.userName = JSON.parse(userName);
      this.password = JSON.parse(password);
      this.login();
    }
  }

  login() {
    this.userService.login(this.userName, this.password)
      .subscribe(res => res ?
        this.onSuccessLogin() :
        this.onFailLogin());
  }

  logout() {
    this.userService.logout();
    this.onLogout();
  }

  onSuccessLogin() {
    localStorage.setItem('userName', JSON.stringify(this.userName));
    localStorage.setItem('password', JSON.stringify(this.password));
    this.router.navigateByUrl('/');
  }

  onFailLogin() {
    this.failedLogin = true;
    setTimeout(() => this.failedLogin = false, 2000);
  }

  onLogout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    this.router.navigateByUrl('/');
  }
}

