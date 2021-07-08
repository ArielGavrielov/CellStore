import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  Contacts : Contact[] = [];
  constructor(private apiService: ApiService) { }
  addMessage(name : string, email : string, subject : string, message : string) {
    let contact = new Contact(name,email,subject,message);
    this.Contacts.push(contact);
    this.apiService.ContactUs(contact).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  getContacts() {
    return this.Contacts;
  }
}

class Contact {
  userName : string;
  userEmail : string;
  subject : string;
  message : string;

  constructor(name : string, email : string, subject : string, message : string) {
    this.userName = name;
    this.userEmail = email;
    this.subject = subject;
    this.message = message;
  }
}
