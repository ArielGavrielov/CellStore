import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  Brands : Brand[] = [];

  bestOfTheWeek = ["1","5","2","4","3"];
  newProducts = ["3","1","4","2","6"];

  getBrands() {
    return this.Brands;
  }

  getBrandOfProductBySerial(serial: string) {
    for(let brand of this.Brands)
      for(let product of brand.products)
        if(product.Serial == serial) return brand;
        
    return null;
  }

  getProductBySerial(serial : string) {
    var products = this.getAllProducts();

    for(let product of products)
      if(product.Serial == serial)
        return product;
    return null;
  }

  getAllProducts() {
    const all = [];
    for(let brand of this.Brands) 
      for(let product of brand.products)
        all.push(product);

    return all;
  }

  constructor(private apiService: ApiService) {
    if(!localStorage.getItem("brands") || JSON.parse(localStorage.getItem("brands")).length == 0) {
      this.apiService.getBrand().toPromise().then(data => {
        for(let brand of data) {
          let Products = {};
          let i = 0;
          this.apiService.getProductByBrand(brand._id).toPromise().then(next => {
            for(let product of next) {
              Products[i++] = new Product(product.serial, product.name, product.price, product.description, product.imageURL, product.discount);
            }
          }, error => {console.log("error", error)})
          .then(value => {
            this.Brands.push(new Brand(brand.name, brand.url, <Product[]>Products));
            localStorage.setItem("brands", JSON.stringify(this.Brands));
          });
        }
      }, error => console.log("error = ", error));
    }
    else
      this.Brands = JSON.parse(localStorage.getItem("brands"));

    this.Brands.forEach(e => {
      let pro : Product[] = [];
      Object.entries(e["products"]).forEach(p => pro.push(Product.buildProduct(p[1])));
      e["products"] = pro;
    });
  }
}

export class Product {
  Serial: string;
  Name: string;
  Price: number;
  Description: string;
  imageURL: string;
  Discount : number;

  constructor(Serial: string, Name: string, Price: number, Description: string, imageURL: string, Discount? : number) {
    this.Serial = Serial;
    this.Name = Name;
    this.Price = Price;
    this.Description = Description;
    this.imageURL = imageURL;
    this.Discount = Discount > 0 ? Discount : 0;
  }

  static buildProduct(obj) {
    if(obj.name) // came from db;
      return new Product(obj.serial, obj.name, obj.price, obj.description, obj.imageURL, obj.discount > 0 ? obj.discount : 0)
    return new Product(obj.Serial, obj.Name, obj.Price, obj.Description, obj.imageURL, obj.Discount > 0 ? obj.Discount : 0);
  } 

  getPrice() {
    return (Number)(Number.parseFloat((String)(this.Price*(1-(this.Discount/100)))).toFixed(2));
  }
}

class Brand {
  name : string;
  url : string;
  products : Product[];

  constructor(name : string, url : string, products : Product[]) {
    this.name = name;
    this.url = url;
    this.products = products;
  }
}