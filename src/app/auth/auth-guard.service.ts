import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '../users.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private usersService : UsersService) {}
  canActivate(): boolean {
    if(this.usersService.getLoggedUser() == null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}