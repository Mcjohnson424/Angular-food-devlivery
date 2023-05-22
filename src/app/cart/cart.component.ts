import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orders: any
  total: any

  constructor(public router: Router, private httpService: HttpService) { 
    this.orders = [];
    this.total = 0;
  }

  ngOnInit(): void {
    const cart: any = localStorage.getItem('cart');
    const cart_obj = JSON.parse(cart);
    this.orders = cart_obj;
    this.orders.map((d: any) => (
      this.total += parseInt(d.total)
    ))
  }

  handleRemove(param1: any, param2: any): void {
    const order = this.orders.filter((order: any) => order.dataPlaced === param1.dataPlaced)[0];
    const dishes = order.dishes.filter((data: any) => data.order !== param2.order);
    let total = 0;
    if(dishes.length === 0) {
      this.orders = this.orders.filter((order: any) => order.dataPlaced !== param1.dataPlaced);
      this.orders.map((d: any) => (
        total += parseInt(d.total)
      ))
      this.total = total;
    } else {
      order.dishes = dishes;
      order.dishes.map((d: any) => {
        total += parseInt(d.total);
      });
      order.total = total;
      this.orders = this.orders.map((od: any) => od.dataPlaced === param1.dataPlaced ? order : od);
    }
    if(this.orders.length === 0) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(this.orders));
    }
  }

  handleConfirm():void {
    const cart: any = localStorage.getItem('cart');
    const cart_obj = JSON.parse(cart);
    cart_obj.map((data: any) => {
      this.httpService.confirmOrders(data).subscribe((res: any) => {
        console.log("success");
      });
    });
    alert("Orders confirmed");
    localStorage.removeItem('cart');
    this.router.navigate(['/orders']);
  }

}
