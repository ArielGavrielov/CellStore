import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { UsersService } from '../users.service';

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
    console.log(this.weekProducts);
  }
}
