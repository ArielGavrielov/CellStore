import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product : any;
  brand: any;
  quantity : number;
  constructor(private router : Router, private productsService : ProductsService, private actRoute: ActivatedRoute, private cartService : CartService) { }

  ngOnInit(): void {
    this.product = this.productsService.getAllProducts().find(Product => Product.Serial == this.actRoute.snapshot.params["serial"]);
    console.log(this.product);
    if(this.product == undefined) {
      this.router.navigate(['**']);
      return;
    }
    this.brand = this.productsService.getBrandOfProductBySerial(this.product.Serial);
    this.quantity = 1;
    if(this.actRoute.snapshot.params["brand"] != this.brand.name) {
      this.router.navigate(['**']);
      return;
    }
  }

  addToCart(serial : string) {
    this.cartService.addProduct(serial, this.quantity);
    console.log(this.cartService.items);
  }

  stepUp() { if(this.quantity < 99) this.quantity++; }
  stepDown() { if(this.quantity > 1) this.quantity--; }
}
