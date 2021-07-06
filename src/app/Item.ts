import { Product } from './sevices/products.service';

export class Item {
    product : Product;
    quantity : number;
  
    constructor(product : Product, quantity? : number) {this.product = product; this.quantity = quantity ? quantity : 1;}

    static createInstanceFromApi(product: any, quantity: number) : Item {
      return new Item(Product.buildProduct(product), quantity);
    }
  /*
    addProduct(serial: string) : boolean {
      console.log(this.products);
      var product = this.productsService.getProductBySerial(serial);
      if(product == null) return false;
      this.products.push(this.productsService.getProductBySerial(serial));
      return true;
    }*/
  }