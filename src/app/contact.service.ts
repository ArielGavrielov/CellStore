import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  Contacts : Contact[] = [];
  constructor() { }
  addMessage(name : string, email : string, subject : string, message : string) {
    this.Contacts.push(new Contact(name,email,subject,message));
  }
  getContacts() {
    return this.Contacts;
  }
}

class Contact {
  name : string;
  email : string;
  subject : string;
  message : string;

  constructor(name : string, email : string, subject : string, message : string) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
  }
}