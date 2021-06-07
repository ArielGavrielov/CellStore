import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/sevices/cart.service';
import { ProductsService } from '../sevices/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  Items : any;

  constructor(private cartService : CartService, public productsService : ProductsService) { }

  ngOnInit(): void {
    this.Items = this.cartService.items;
    console.log(this.Items);
  }

  changeQuantity(item, n) {
    this.cartService.changeQuantity(item, n);
  }

  removeFromCart(item) {
    this.cartService.remove(item);
  }

  getTotal() {
    return this.cartService.total;
  }
}
