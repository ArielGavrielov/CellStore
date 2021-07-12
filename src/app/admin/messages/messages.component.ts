import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/sevices/api-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages : Array<any>;

  constructor(private apiService : ApiService) { }

  async ngOnInit(): Promise<void> {
    await this.apiService.getContacts().toPromise()
    .then(data => {
      for(let message of data) {
        message.time = moment(message.time, "DD.MM.YYYY, hh:mm:ss").toDate();
      }
      this.messages = data;
    });
    this.messages.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return b.date - a.date;
    });
    console.log(this.messages);
    
    //let myMoment = moment(this.messages[0].time, "DD.MM.YYYY, hh:mm:ss");
    //console.log(myMoment.toDate())
  }

}
