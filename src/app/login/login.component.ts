import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users = [];
  userNotFound : boolean = false;
  constructor(private usersService : UsersService, private router : Router) { }

  ngOnInit(): void {
    if(this.usersService.getLoggedUser() != null) {
      this.router.navigate(['/home']);
      return;
    }
    this.users = this.usersService.getUsers();
    console.log(this.users);
  }

  onChange(element) {
    this.userNotFound = false;
    if(element.target.classList.contains('ng-valid')) {
      element.target.classList.remove('is-invalid');
      element.target.classList.add('is-valid');
    }
    else if(element.target.classList.contains('ng-invalid')) {
      element.target.classList.add('is-invalid');
      element.target.classList.remove('is-valid');
    }
  }
  onSubmit(loginForm) {
    for(let user of this.users) {
      if(user.email == loginForm.value.email && user.password == loginForm.value.password) {
        this.usersService.setLoggedUser(user);
        this.router.navigate(['/home']);
        this.userNotFound = false;
        return;
      }
    }
    this.userNotFound = true;
  }
}
