import { Injectable } from '@angular/core';
import { Item } from '../Item';
import { ProductsService } from './products.service';
import { User, UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items : Item[] = [];
  user : User;
  total : number;

  constructor(private productsService : ProductsService, private usersService : UsersService) {
    console.log(this.productsService.getAllProducts());
    this.user = this.usersService.getLoggedUser();
  }

  addProduct(serial: string, quantity? : number) : boolean {
    let i = this.isInCart(serial);
    if(i != -1) {
      if(this.items[i].quantity < 99) {
        if(quantity) {
          if(this.items[i].quantity + quantity < 99)
            this.items[i].quantity+=quantity;
          else
            this.items[i].quantity = 99;
        }
        else
          this.items[i].quantity++;

        alert(this.items[i].product.Name + " quantity is updated to " + this.items[i].quantity + ".");
      }
      else alert(this.items[i].product.Name + " is already maximum quantity (" + this.items[i].quantity + ")");
    }
    else {
      var product = this.productsService.getProductBySerial(serial);
      if(product == null) return false;

      if(quantity)
        var item = new Item(product, quantity);
      else
        var item = new Item(product);
      
      this.items.push(item);
      
      alert(product.Name + " added to cart. "+ "(quantity: "+item.quantity+")");
    }
    this.updateTotal();
    return true;
  }

  changeQuantity(item : Item, n : number) {
    const index: number = this.items.indexOf(item);
    if(this.items[index].quantity + n >= 1 && this.items[index].quantity + n <= 99)
      this.items[index].quantity += n;
    this.updateTotal();
  } 

  isInCart(serial : string) : number {
    for(let i = 0; i < this.items.length; i++)
      if(this.items[i].product.Serial == serial) return i;
    return -1;
  }

  remove(item) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.updateTotal();
    }  
  }

  updateTotal() {
    this.total = 0;
    for(let item of this.items) {
      this.total += item.product.getPrice()*item.quantity;
    }
  }
}
