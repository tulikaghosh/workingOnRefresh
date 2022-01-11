import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cart } from '../models/cart.model';
import { Observable } from "rxjs";
import {Instance} from "../models/Instance";
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = Instance.url + "/api/cart";
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
   }

  updateCartService(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(this.baseUrl + "/put", cart, this.header);
  }


  addCartService(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl + "/post", cart, this.header);
  }


}
