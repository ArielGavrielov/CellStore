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
    for(let product of products) {
      if(product.Serial == serial)
        return product;
    }
    return null;
  }

  getAllProducts() {
    const all = [];
    for(let brand of this.Brands) 
      for(let product of brand.products) {
        all.push(product);
  }

    return all;
  }

  parseJsonToBrands(brands) : Brand[] {
    let res : Brand[] = [];
    for(let brand of brands) res.push(Brand.buildBrand(brand));
    return res;
  }

  constructor(private apiService: ApiService) {
    if(localStorage.getItem("brands") && JSON.parse(localStorage.getItem("brands")).length > 0)
      this.Brands = this.parseJsonToBrands(JSON.parse(localStorage.getItem("brands")));
    
    this.apiService.getBrand().toPromise().then(async res => {
      this.Brands = [];
      for(let brand of res) {
        let products = [];
        await this.apiService.getProductByBrand(brand._id).toPromise().then((data) => {
          for(let product of <[]>data)
            products.push(Product.buildProduct(product, brand));
        });
        this.Brands.push(new Brand(brand.name, brand.url, products));
      }
    }).finally(() => localStorage.setItem("brands", JSON.stringify(this.Brands)));
  }
}

export class Product {
  Serial: string;
  Name: string;
  Price: number;
  Description: string;
  imageURL: string;
  Discount : number;
  brandName : string

  constructor(Serial: string, Name: string, Price: number, Description: string, imageURL: string, Discount? : number, brandName? : string) {
    this.Serial = Serial;
    this.Name = Name;
    this.Price = Price;
    this.Description = Description;
    this.imageURL = imageURL;
    this.Discount = Discount > 0 ? Discount : 0;
    this.brandName = brandName;
  }

  static buildProduct(obj, brand?) {
    if(obj.name) // came from db;
      return new Product(obj.serial, obj.name, obj.price, obj.description, obj.imageURL, obj.discount > 0 ? obj.discount : 0, brand?.name)
    return new Product(obj.Serial, obj.Name, obj.Price, obj.Description, obj.imageURL, obj.Discount > 0 ? obj.Discount : 0, brand?.name);
  } 

  getPrice() {
    return (Number)(Number.parseFloat((String)(this.Price*(1-(this.Discount/100)))).toFixed(2));
  }
}

class Brand {
  name : string;
  url : string;
  products : Product[];

  static buildBrand(obj) {
    let products = [];
    for(let [ind, p] of Object.entries(obj.products)) {
      products.push(Product.buildProduct(p, obj));
    }
    return new Brand(obj.name, obj.url, products);
  }

  constructor(name : string, url : string, products : Product[]) {
    this.name = name;
    this.url = url;
    this.products = products;
  }
}