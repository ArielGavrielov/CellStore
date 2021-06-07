import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../sevices/products.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Authors : any[] = [
    { name:"Ariel", profession: "Developer", email: "arielgavrielov@icloud.com", avatar: "https://i.pinimg.com/originals/1e/ef/72/1eef72823743d9c47d8840e55b0823f0.png" },
    { name: "Mor", profession: "Developer", email: "morbs75@gmail.com", avatar: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201907/imgonline-com-ua-FrameBlurred-_14.jpeg?m6aZMJ2FuRNdIJhw9MbIpcGgJvY3yzW6&size=770:433" },
  ];
  brands : any;
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
    this.brands = this.productService.getBrands();
  }

}
