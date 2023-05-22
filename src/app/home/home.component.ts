import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { Store } from '@ngrx/store';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: any
  meals: any
  searchForm: FormGroup
  // user$: Observable<number>

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    // private store: Store<{ app: any }>
  ) {
    // store.select('app').subscribe((data) => {
    //   console.log(data)
    // })
    // this.user$ = store.select('app');

    this.searchForm = this.fb.group({
      search_key: ['']
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.getMeals();
  }

  getMeals(): void {
    this.httpService.getMeals().subscribe((response: any) => { 
      this.meals = response;
    });
  }

  handleSearch(): void {
    this.httpService.getSearchMeal(this.searchForm.value.search_key).subscribe((resp: any) => {
      this.meals = resp;
    })
  }

  handleAddCart(id: any): void {
    const count = (<HTMLInputElement>document.getElementById("txtQuantity_" + id)).value;
    if(parseInt(count) > 0) {
      this.httpService.getDish(id).subscribe((res: any) => {
        let data;
        if(localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null) {
          data = {
            order: res.dish,
            total: parseInt(count) * parseInt(res.price),
            servings: count
          };
          // const orders = 
        } else {
          data = {
            dishes: [{
              order: res.dish,
              total: parseInt(count) * parseInt(res.price),
              servings: count
            }],
            dataPlaced: new Date(),
            status: "Placed",
            userId: localStorage.getItem('userid'),
            total: parseInt(count) * parseInt(res.price)
          }
        }
        if(localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null) {
          let old_cart: any = localStorage.getItem('cart');
          let cart_obj = JSON.parse(old_cart);
          cart_obj.push(data);
          localStorage.setItem('cart', JSON.stringify(cart_obj));
        } else {
          const cart = [data];
          localStorage.setItem('cart', JSON.stringify(cart));
        }
        alert("dish added to cart");
        // this.httpService.addCart(data).subscribe((resp: any) => {
        //   alert("dish added to cart");
        // })
      })
    }
  }
}
