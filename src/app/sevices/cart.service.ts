import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../Item';
import { ApiService } from './api-service.service';
import { ProductsService } from './products.service';
import { User, UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items : Item[] = [];
  total : number;

  constructor(private apiService: ApiService, private productsService : ProductsService, private router : Router) {
    // get user cart from db;
    this.apiService.getCart().subscribe(data => {
      for(let item of data) {
        var product : any;
        this.apiService.getProductByObjectId(item.productId).toPromise()
        .then(p => {product = p})
        .catch(err => console.log(err))
        .finally(() => {
          this.items.push(Item.createInstanceFromApi(product, item.quantity));
          this.updateTotal();
          console.log("cart items", this.items);
        });
      }
    });
  }

  addProduct(serial: string, quantity? : number) : boolean {
    let i = this.isInCart(serial);
    if(i != -1)
      alert(this.changeQuantity(this.items[i], quantity ? quantity : 1))
    else {
      var product = this.productsService.getProductBySerial(serial);
      if(product == null) return false;

      if(quantity)
        var item = new Item(product, quantity);
      else
        var item = new Item(product);
      
      this.items.push(item);

      this.apiService.addToCart(serial, item.quantity)
      .then(data => console.log("add product", data))
      .catch(err => console.log(err));

      alert(product.Name + " added to cart. "+ "(quantity: "+item.quantity+")");
    }
    this.updateTotal();
    return true;
  }

  changeQuantity(item : Item, n : number) : string {
    if(item.quantity + n >= 1 && item.quantity + n <= 99) {
      item.quantity += n;
      this.apiService.addToCart(item.product.Serial, item.quantity)
      .then(res => console.log("changeQuantity", res));
      this.updateTotal();
      return item.product.Name + " quantity is updated to " + item.quantity + "."
    } else 
      return item.product.Name + " maximum quantity is 99 and minimum is 1.";
  } 

  isInCart(serial : string) : number {
    for(let i = 0; i < this.items.length; i++)
      if(this.items[i].product.Serial == serial) return i;
    return -1;
  }

  remove(item : Item) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.apiService.deleteFromCart(this.items[index].product.Serial)
      .then(data => console.log("remove from cart", data))
      .catch(err => console.log("delete err", err));
      this.items.splice(index, 1);
      this.updateTotal();
    }  
  }

  emptyCart() {
    this.apiService.deleteFromCart()
    .then(data => console.log("empty cart", data))
    .catch(err => console.log("empty cart", err));
    this.items = [];
    this.updateTotal();
  }

  updateTotal() {
    this.total = 0;
    for(let item of this.items)
      this.total += item.product.getPrice()*item.quantity;
  }

  Checkout() {
    console.log("Checkout");
    this.apiService.Checkout({items: this.items}).subscribe(
      (next) => {
        console.log(next);
        this.router.navigate(['Thankyou'],{state: {orderId: next.orderId}});
        this.emptyCart();
      }, (error) => {
        console.log(error);
      }
    )
  }
}
