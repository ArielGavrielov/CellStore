import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '../sevices/users.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private usersService : UsersService) {}
  canActivate(): boolean {
    if(this.usersService.getLoggedUser() == null) {
      this.reload('/login');
      console.log("MOVE TO LOGIN");
      //this.router.navigate(['/login'], {skipLocationChange: true});
      return false;
    }
    return true;
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('.', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}