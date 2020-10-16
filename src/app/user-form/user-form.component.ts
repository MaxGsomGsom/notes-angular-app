import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
  user = new User();

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }
}
