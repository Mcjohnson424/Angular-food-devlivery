import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { api } from 'src/environments/environment.prod';
import { Observable } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  register(params: any): Observable<any> {
    const url = `${api.baseUrl}/users`;
    return this.http.post(url, params);
  }

  login(params: any): Observable<any> {
    const url = `${api.baseUrl}/users?login.username=${params.username}&login.password=${params.password}`;
    return this.http.get(url);
  }

  getUser(): Observable<any> {
    const uid = localStorage.getItem('userid');
    const url = `${api.baseUrl}/users/${uid}`;
    return this.http.get(url);
  }

  editUser(params: any): Observable<any> {
    const url = `${api.baseUrl}/users/${localStorage.getItem('userid')}`;
    return this.http.put(url, params);
  }

  getMeals(): Observable<any> {
    const url = `${api.baseUrl}/weeklyMenu`;
    return this.http.get(url);
  }

  getSearchMeal(param: any): Observable<any> {
    let url = "";
    if(param === "") {
      url = `${api.baseUrl}/weeklyMenu`;
    } else {
      url = `${api.baseUrl}/weeklyMenu?q=${param}`;
    }
    return this.http.get(url);
  }

  getDish(id: any): Observable<any> {
    const url = `${api.baseUrl}/weeklyMenu/${id}`;
    return this.http.get(url);
  }

  addCart(params: any): Observable<any> {
    // if(localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null) {
    //   let old_cart = localStorage.getItem('cart');
    //   old_cart.push(params);
    // } else {
    //   localStorage.setItem('cart', [params])
    // }
    const url = `${api.baseUrl}/orders`;
    return this.http.post(url, params);
  }

  getOrders(): Observable<any> {
    const url = `${api.baseUrl}/orders?userId=${localStorage.getItem('userid')}&status=Placed`;
    return this.http.get(url);
  }

  getOrder(id: any): Observable<any> {
    const url = `${api.baseUrl}/orders/${id}`;
    return this.http.get(url);
  }

  removeOrder(order: any): Observable<any> {
    if(order.dishes.length > 0) {
      const url=`${api.baseUrl}/orders/${order.id}`
      return this.http.put(url, order);
    } else {
      const url=`${api.baseUrl}/orders/${order.id}`
      return this.http.delete(url);
    }
  }

  confirmOrders(params: any): any {
    const url = `${api.baseUrl}/orders`;
    return this.http.post(url, params);
  }
}
