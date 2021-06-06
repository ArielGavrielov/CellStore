import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  Users : User[] = [
    new User("Ariel", "ariel@gmail.com", "123456", true),
    new User("Mor", "mor@gmail.com", "123456", true)
  ];
  loggedUser : User;

  getUsers() {
    return this.Users;
  }

  addUser(name: string, email: string, password: string) : User {
    for(let user of this.Users)
      if(user.email == email) return null;

    return this.Users[this.Users.push(new User(name,email,password, false))-1];
  }

  setLoggedUser(user: User) {
    this.loggedUser = user;
  } 
  getLoggedUser() {
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
  isAdmin: boolean;

  constructor(name : string, email : string, password : string, isAdmin : boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
  

  //getCart() { return this.cart; }
}