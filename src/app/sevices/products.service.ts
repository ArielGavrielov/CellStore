import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  Brands : Brand[] = [
    new Brand("Apple ", "https://apple.com", [
      new Product("1", "iPhone 12 Pro Max", 1100, "5G goes Pro. A14 Bionic rockets past every other smartphone chip. The Pro camera system takes low-light photography to the next level — with an even bigger jump on iPhone 12 Pro Max. And Ceramic Shield delivers four times better drop performance. Let’s see what this thing can do.", "iphone-12-pro-max.png", 7),
      new Product("5", "iPhone 11", 599.99, "Shoot 4K videos, beautiful portraits, and sweeping landscapes with the all-new dual-camera system. Capture your best low-light photos with Night mode. See true-to-life color in your photos, videos, and games on the 6.1-inch Liquid Retina display. Experience unprecedented performance with A13 Bionic for gaming, augmented reality (AR), and photography. Do more and charge less with long-lasting battery life.", "iPhone-11.jpg", 10),
      new Product("6", "iPhone SE", 399.99, "iPhone SE is the most powerful 4.7-inch iPhone ever. Featuring the A13 Bionic chip for incredible performance in apps, games, and photography. Portrait mode for studio-quality portraits and six lighting effects. Next-generation Smart HDR for incredible detail aiPhone SE is the most powerful 4.7-inch iPhone ever. Featuring the A13 Bionic chip for incredible performance in apps, games, and photography. Portrait mode for studio-quality portraits and six lighting effects. Next-generation Smart HDR for incredible detail across highlights and shadows. Cinematic-quality 4K video. And all the advanced features of iOS. With long battery life and water resistance, it’s so much of the iPhone you love, in a not so big size.", "iPhone-SE.png")
    ]),
    new Brand("Samsung", "https://samsung.com", [
      new Product("2", "Galaxy S21 5G", 799.99, "Made for the epic in every day. The Samsung Galaxy S21 5G and its new stylish design was created to help you capture life’s ordinary moments and make them extraordinary. With the ability to record in 8K, your videos are cinema quality. Use the 64MP camera for still shots that come out clear whether it’s day or night. Single Take AI transcends the usual restrictions of photo and video editing to capture life’s greatest moments, wherever they happen, in one single take*. The beautiful 6.2” adaptive 120Hz display makes scrolling feel faster and silky smooth while also being easy on the eyes for ultimate viewing. Experience the incredibly advanced Galaxy on the 5G leader in coverage.", "galaxy-s21-5g.png", 15),
    ]),
    new Brand("OnePlus", "https://www.oneplus.com", [
      new Product("3", "Nord N100", 180, "The OnePlus Nord N100 – all day immersive entertainment, right in the palms of your hands. Powered by a massive 5000mAh battery, the N100 is equipped to handle all the movies, TV shows, and games you can handle - all day long. With its 6.52” HD+ LCD display, the N100 is perfect for engaging with all content. Combine that with a healthy amount of RAM and expandable storage, and it’s no surprise that all your apps and games run super smoothly on the N100. A triple camera system allows for beautiful photo and video shoots, including the additional bokeh and macro lenses for even more ways to personalize your photo experience. With a price well below its weight class, the OnePlus Nord N100 is the perfect smartphone smart-buy for anyone looking to get the maximum bang for their buck.", "Nord-N100.png", 10),
    ]),
    new Brand("Google", "https://store.google.com/", [
      new Product("4", "Pixel 4A", 499, "Pixel 4a with 5G is the budget-friendly, super fast phone from Google. It has the helpful stuff you need in a phone, with an extra boost of 5G speed.1 So you can download a movie in seconds,2 enjoy smooth streaming, and play your favorite games. Pixel 4a with 5G also takes amazing ultrawide photos in any light, keeps your data safe, blocks robocalls,3 helps you tackle your to-do list, and has an all-day battery that can last up to 48 hours with Extreme Battery Saver.4 It’s a lot of help from Google, for a lot less than you’d expect.", "Pixel-4a.png", 5)
    ]),
  ];

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
  constructor() { }
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