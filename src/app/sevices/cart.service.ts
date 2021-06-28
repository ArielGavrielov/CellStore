import { Injectable } from '@angular/core';
import { Item } from '../Item';
import { ApiService } from './api-service.service';
import { ProductsService } from './products.service';
import { User, UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items : Item[] = [];
  user : User;
  total : number;

  constructor(private apiService: ApiService, private productsService : ProductsService, private usersService : UsersService) {
    this.user = this.usersService.getLoggedUser();
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
          console.log("items", this.items);
        });
      }
    });
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

        this.apiService.addToCart(serial, this.items[i].quantity)
        .then(data => console.log(data))
        .catch(err => console.log(err));
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

      this.apiService.addToCart(serial, item.quantity)
      .then(data => console.log(data))
      .catch(err => console.log(err));

      alert(product.Name + " added to cart. "+ "(quantity: "+item.quantity+")");
    }
    this.updateTotal();
    return true;
  }

  changeQuantity(item : Item, n : number) {
    const index: number = this.items.indexOf(item);
    if(this.items[index].quantity + n >= 1 && this.items[index].quantity + n <= 99) {
      this.items[index].quantity += n;
      this.apiService.addToCart(this.items[index].product.Serial, this.items[index].quantity)
      .then(res => console.log(res));
    }
    this.updateTotal();
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
      .then(data => console.log(data))
      .catch(err => console.log("delete err", err));
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
