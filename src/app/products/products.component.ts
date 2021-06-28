import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../sevices/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/sevices/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  Brands = [];
  allProducts = [];
  currentBrand;
  sub: any;

  constructor(private cartService : CartService, private router : Router, public productsService : ProductsService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.Brands = this.productsService.getBrands();
    this.allProducts = this.productsService.getAllProducts();

    this.sub = this.actRoute.params.subscribe(params => {
      if(params["brand"] != undefined && !params["brand"].includes("all")) {
        this.currentBrand = this.Brands.find(Brands => Brands.name == this.actRoute.snapshot.params["brand"]);
  
        if(this.currentBrand == null) 
          return this.router.navigate(['**']);
        this.currentBrand = this.currentBrand.products;
      } else
        this.currentBrand = this.allProducts;
   });
  }

  addToCart(serial : string) {
    this.cartService.addProduct(serial);
    console.log(this.cartService.items);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
