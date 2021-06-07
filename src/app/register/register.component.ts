import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../sevices/api-service.service';
import { User, UsersService } from '../sevices/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailError: String = null;
  error: String = null;
  constructor(private apiService : ApiService, private usersService : UsersService, private router : Router) { }

  ngOnInit(): void {
    if(this.usersService.getLoggedUser() != null) {
      this.router.navigate(['/home']);
      return;
    }
  }

  onChange(element) {
    if(element.target.classList.contains('ng-valid')) {
      element.target.classList.remove('is-invalid');
      element.target.classList.add('is-valid');
    }
    else if(element.target.classList.contains('ng-invalid')) {
      element.target.classList.add('is-invalid');
      element.target.classList.remove('is-valid');
    }
  }

  checkEmail = function(element) {
    if(element.target.classList.contains('is-valid')) {
      this.apiService.getUser(element.target.value).subscribe(data => {
        if(data.length != 0) {
          element.target.classList.add('is-invalid');
          element.target.classList.remove('is-valid');
          this.emailError = "Email is used.";
        }
        else {
          this.emailError = null;
        }
      });
    }
  }

  onSubmit(registerForm) {
    let userScheme = new User(registerForm.value.name, registerForm.value.email, registerForm.value.password);
    this.apiService.registerUser(userScheme).subscribe(data => {
      console.log("data");
    }, error => {
      console.log(error.error.text);
      this.error = error.error.text;
      return;
    }, () => {
      this.usersService.setLoggedUser(userScheme);
      this.router.navigate(['/home']);
    });
  }
}
