import { Component } from '@angular/core';
import { UsersService } from './sevices/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CellStore';
  userActive;
  constructor(private usersService : UsersService) { }

  ngOnInit(): void {
    this.userActive = this.usersService.getLoggedUser();
  }
}
