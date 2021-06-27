import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/sevices/users.service';
import { ProductsService } from '../sevices/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  weekProducts = [];
  newProducts = [];
  constructor(public usersService : UsersService, public productsService : ProductsService) { }

  ngOnInit(): void {
    for(let serial of this.productsService.bestOfTheWeek)
      this.weekProducts.push(this.productsService.getProductBySerial(serial));
    for(let serial of this.productsService.newProducts)
      this.newProducts.push(this.productsService.getProductBySerial(serial));
  }
}
