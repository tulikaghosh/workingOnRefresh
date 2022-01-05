import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discount, Product, ProductAndDiscount } from '../models/product.model';
import {Instance} from "../models/Instance";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //products endpoints
  productsUrl = Instance.url + "/api/products";
  productsUrl2 = Instance.url + "/combined/Disc/Products";
  discountUrl = Instance.url + "/discounts";

  // add other endpoints below if needed

  constructor(private http: HttpClient) { }

  //add Product
  addProductsService(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct);
  }

  //Update a product
  updateProductsService(updateProd: Product): Observable<Product> {
    return this.http.put<Product>(this.productsUrl + "/" + updateProd.productId, updateProd);
  }

  //get all Products from DB table
  getAllProductsService(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  //Retrieve one Product
  getOneProductsService(productId: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + "/" + productId);
  }

  //Retrieve one Product
  deleteProductsService(productId: number): Observable<Product> {
    return this.http.delete<Product>(this.productsUrl + "/" + productId);
  }

  //get all Discounted Products from DB table
  getAllDiscountsProductsService(): Observable<ProductAndDiscount[]> {
    return this.http.get<ProductAndDiscount[]>(this.productsUrl2);
  }

  //Adds inputted discount into backend
  addDiscountService(newDiscount: Discount): Observable<Discount> {
    return this.http.post<Discount>(this.discountUrl + "/add", newDiscount);
  }
  updateDiscountService(updateDiscount: Discount): Observable<Product> {
    return this.http.put<Product>(this.discountUrl + "/update", updateDiscount);
  }

  deleteDiscountService(discountId: number): Observable<Discount> {
    return this.http.delete<Discount>(this.discountUrl + "/remove/" + discountId);
  }

}
