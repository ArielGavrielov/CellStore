import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../sevices/api-service.service';

@Injectable()
export class AuthGuardAdminService implements CanActivate {

  constructor(private apiService : ApiService, private router : Router) { }

  async canActivate(): Promise<boolean> {
    let isAdmin : boolean = false;
    if(localStorage.getItem("loggedUser")) {
      let user = JSON.parse(localStorage.getItem("loggedUser"));
      await this.apiService.getUser(user.email).toPromise().then(data => {
        isAdmin = <boolean>data.isAdmin;
      }).catch(error => console.log("isAdmin error", error));

      if(isAdmin)
        return true;
      
      this.router.navigate(['Forbidden']);
    }
    else
      this.router.navigate(['']);
    return false;
  }
}
