import { Component, OnInit } from '@angular/core';
import { CartService } from '../sevices/cart.service';
import { UsersService } from '../sevices/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public usersService : UsersService, public cartService : CartService) { }

  ngOnInit(): void {
  }
}
