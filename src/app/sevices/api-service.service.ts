import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = "http://localhost:8000/api/"
  users: string = "users/"
  products: string = "products/"
  brands: string = "brands/"
  cart: string = "cart/"

  headers = {
    "content-type": "application/json"
  }
  constructor(private http: HttpClient) { }

  // USER API //
  getUser(email): Observable<any> {
    return this.http.get(this.baseURL + this.users + email, {headers: this.headers});
  }

  async getUserObjectId(email: string) {
    return await this.getUser(email).toPromise().then(data => {return data._id});
  }

  registerUser(user): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + this.users + "register", body, {
      headers: this.headers
    });
  }

  loginUser(user): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + this.users + "login", body, {
      headers: this.headers
    });
  }

  // PRODUCTS API //
  getProduct(serial?: string): Observable<any> {
    // returns specific product;
    if(serial)
      return this.http.get(this.baseURL + this.products + "get/" + serial, { headers: this.headers});
    // returns all products;
    return this.http.get(this.baseURL + this.products, { headers: this.headers});
  }

  async getProductObjectId(serial:string) {
    return await this.getProduct(serial).toPromise().then(data => {return data[0]._id});
  }

  getProductByObjectId(id:string): Observable<any> {
    return this.http.get(this.baseURL + this.products + id, { headers: this.headers});
  }

  getProductByBrand(brand: string): Observable<any> {
    return this.http.get(this.baseURL + this.products + "get/all/" + brand, {headers: this.headers});
  }

  createProduct(product): Observable<any> {
    let body = JSON.stringify(product);
    return this.http.post(this.baseURL + this.products + "create", body, {
      headers: this.headers
    });
  }

  // BRANDS API //
  getBrand(name?: string): Observable<any> {
    if(name) return this.http.get(this.baseURL + this.brands + name, {headers: this.headers});
    return this.http.get(this.baseURL + this.brands, {headers: this.headers});
  }

  // CART API //
  getCart() : Observable<any> {
    return this.http.get(this.baseURL + this.cart + localStorage.getItem("loggedUserId"), {headers: this.headers});
  }

  async addToCart(productSerial: string, quantity: Number) {
    return this.http.post(this.baseURL + this.cart, {userId: localStorage.getItem("loggedUserId"), productId: await this.getProductObjectId(productSerial), quantity: quantity}, {headers: this.headers}).toPromise();
  }

  async deleteFromCart(productSerial?: string) : Promise<any>  {
      if(productSerial)
        return this.http.delete(this.baseURL + this.cart + localStorage.getItem("loggedUserId") + "/" + await this.getProductObjectId(productSerial), {headers: this.headers}).toPromise();
      else
        return this.http.delete(this.baseURL + this.cart + localStorage.getItem("loggedUserId"), {headers: this.headers}).toPromise();
  }
}
