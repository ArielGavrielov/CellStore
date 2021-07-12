import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../sevices/contact.service';
import { UsersService } from '../sevices/users.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm : FormGroup;
  loggedUser : any;
  constructor(private usersService : UsersService, private contactSerive : ContactService) { }

  ngOnInit(): void {
    this.loggedUser = this.usersService.getLoggedUser();
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = new FormGroup({
      name : new FormControl({value:this.loggedUser.name, disabled:true},Validators.required),
      email : new FormControl({value:this.loggedUser.email, disabled:true},Validators.required),
      subject : new FormControl('', [Validators.required,Validators.minLength(2)]),
      message : new FormControl('', [Validators.required,Validators.minLength(2)])
    });
  }

  onSubmit() {
    this.contactSerive.addMessage(this.loggedUser.name,this.loggedUser.email, this.contactForm.value.subject, this.contactForm.value.message);
    this.contactForm.reset({
      name : {value:this.loggedUser.name, disabled:true},
      email : {value:this.loggedUser.email, disabled:true},
    });
    alert("Thank you for your message");
  }
}
