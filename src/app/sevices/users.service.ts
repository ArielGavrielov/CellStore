import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private api: ApiService) {}

  Users : User[] = [];
  loggedUser : User;

  getUsers() {
    return this.Users;
  }

  addUser(name: string, email: string, password: string) {
    let a = this.api.registerUser({name, email, password});
    a.subscribe(data => {
      console.log("register user", data);
      return new User(name, email, password);
    }, error => {
      console.log("register user error", error);
      return null;
    });
  }

  async setLoggedUser(user : User) {
    this.loggedUser = user;
    if(user != null) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      localStorage.setItem("loggedUserId", await this.api.getUserObjectId(user.email));
    } else {
      localStorage.clear();
    }
    console.log("loggeduser id", localStorage.getItem("loggedUserId"));
    window.location.reload();
  } 
  getLoggedUser() {
    if(this.loggedUser) return this.loggedUser;
    if(localStorage.getItem("loggedUser")) this.loggedUser = User.getUserFromLS(JSON.parse(localStorage.getItem("loggedUser")));
    return this.loggedUser;
  }

  helloUser() {
    let currentHour = new Date().getHours();
    let str = "Good ";
    if(currentHour >= 6 && currentHour < 12)
      str += "Morning";
    else if(currentHour >= 12 && currentHour < 19)
      str += "Afternoon";
    else
      str += "Night";
    str += " " + this.getLoggedUser().name;
    return str;
  }
}

export class User {
  name: string;
  email: string;
  password: string;
  isAdmin: Boolean;

  constructor(name : string, email : string, password : string, isAdmin? : Boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
  
  static getUserFromLS(ls) : User {
    return new User(ls.name, ls.email, ls.password, ls.isAdmin);
  }

  //getCart() { return this.cart; }
}