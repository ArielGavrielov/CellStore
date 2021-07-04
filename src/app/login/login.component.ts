import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../sevices/users.service';
import { Router } from '@angular/router';
import { ApiService } from '../sevices/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userNotFound : Boolean;
  constructor(private apiService: ApiService, private usersService : UsersService, private router : Router) { }

  ngOnInit(): void {
    if(this.usersService.getLoggedUser() != null) {
      this.router.navigate(['/home']);
      return;
    }
  }

  onChange(element) {
    this.userNotFound = false;
    if(element.target.classList.contains('ng-valid')) {
      element.target.classList.remove('is-invalid');
      element.target.classList.add('is-valid');
    } else if(element.target.classList.contains('ng-invalid')) {
      element.target.classList.add('is-invalid');
      element.target.classList.remove('is-valid');
    }
  }
  onSubmit(loginForm) {
    this.apiService.loginUser({email: loginForm.value.email, password: loginForm.value.password})
    .subscribe(data => {
      if(data.length == 0) this.userNotFound = true;
      else {
        this.usersService.setLoggedUser(new User(data.name, data.email, data.password));
        //this.router.navigate(['/home']);
        this.userNotFound = false;
        return;
      }
    });
  }
}
