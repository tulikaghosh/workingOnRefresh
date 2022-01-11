import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartItem } from '../models/cart.model';
import { Instance } from "../models/Instance";
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})

export class CartItemService {
  getCartAndItemsWithUserIdService() {
    throw new Error('Method not implemented.');
  }

  baseUrl = Instance.url + "/api/cart-items";
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
   }
  addNewItemService(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl + "/post", item, this.header);
  }

  updateItemService(item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(this.baseUrl + "/put", item, this.header);
  }

  removeItemService(itemId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + "/" + itemId + "/delete", this.header);
  }


}
