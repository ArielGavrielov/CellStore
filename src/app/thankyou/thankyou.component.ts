import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  orderId : Number;
  constructor(private router : Router) {
    const state = this.router.getCurrentNavigation().extras.state as {
      orderId: Number
    }
    if(!state) router.navigate(['**']);
    this.orderId = state.orderId;

  }

  ngOnInit(): void {
  }

}
