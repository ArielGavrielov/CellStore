import { Product } from './products.service';

export class Item {
    product : Product;
    quantity : number;
  
    constructor(product : Product, quantity? : number) {this.product = product; this.quantity = quantity ? quantity : 1;}
  /*
    addProduct(serial: string) : boolean {
      console.log(this.products);
      var product = this.productsService.getProductBySerial(serial);
      if(product == null) return false;
      this.products.push(this.productsService.getProductBySerial(serial));
      return true;
    }*/
  }