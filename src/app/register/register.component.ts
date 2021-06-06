import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isFailed : boolean = false;
  constructor(private usersService : UsersService, private router : Router) { }

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
onSubmit(registerForm) {
  const user = this.usersService.addUser(registerForm.value.name, registerForm.value.email, registerForm.value.password);
  if(user == null) { this.isFailed = true; return; }
  this.usersService.setLoggedUser(user);
  this.router.navigate(['/home']);
}

}
