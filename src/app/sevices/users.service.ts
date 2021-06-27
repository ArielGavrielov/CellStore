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
      console.log("data");
    }, error => {
      console.log("error");
      return null;
    }, () => {
      console.log("yay");
      return new User(name, email, password);
    });
  }

  setLoggedUser(user) {
    this.loggedUser = user;
    localStorage.setItem("loggedUser", JSON.stringify(user));
  } 
  getLoggedUser() {
    if(this.loggedUser) return this.loggedUser;
    if(localStorage.getItem("loggedUser")) this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
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

  constructor(name : string, email : string, password : string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  

  //getCart() { return this.cart; }
}