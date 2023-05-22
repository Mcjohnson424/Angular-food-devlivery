import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any

  constructor(private httpService: HttpService) { 
    this.orders = [];
  }

  ngOnInit(): void {
    this.httpService.getOrders().subscribe((res: any) => {
      this.orders = res;
      console.log(this.orders)
    })
  }

}
