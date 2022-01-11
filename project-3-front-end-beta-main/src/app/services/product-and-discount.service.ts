import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { ProductAndDiscount } from '../models/product.model';
import {Instance} from "../models/Instance";
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductAndDiscountService {


  baseUrl = Instance.url + "/api/product-discount";
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
   }

  getProductAndDiscountService(productId: number): Observable<ProductAndDiscount> {
    return this.http.get<ProductAndDiscount>(this.baseUrl + "/" + productId + "/get", this.header);
  }

}