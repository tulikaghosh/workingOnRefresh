import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartAndItems } from '../models/cart.model';
import {Instance} from "../models/Instance";
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})

export class CartAndItemsService {

  baseUrl = Instance.url + "/api/cart-and-items";
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
   }

  getCartAndItemsService(cartId: number): Observable<CartAndItems>{
    return this.http.get<CartAndItems>(this.baseUrl + "/cart/" + cartId + "/get", this.header);
  }

  getCartAndItemsWithUserIdService(userId: number): Observable<CartAndItems> {
    return this.http.get<CartAndItems>(this.baseUrl + "/user/" + userId + "/get", this.header);
  }

}
