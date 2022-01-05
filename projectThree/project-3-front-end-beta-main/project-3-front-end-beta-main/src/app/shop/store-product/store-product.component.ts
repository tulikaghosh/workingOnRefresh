import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductAndDiscount } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Cart, CartAndItems, CartItem } from "../../models/cart.model";
import { TokenStorageService } from "../../services/token-storage.service";
import { CartItemService } from "../../services/cart-item.service";
import { CartAndItemsService } from "../../services/cart-and-items.service";

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.scss']
})
export class StoreProductComponent implements OnInit {
  //Arrays, Objects, & string
  allProducts: Product[] = [];
  allDiscountProducts: ProductAndDiscount[] = [];
  indexArray: number[] = [];
  productObject: Product = new Product();
  formValue      !: FormGroup;
  errorProductMsg: string = '';
  saveIndex: number = 0;
  userId: any = 0;
  cartAndItems: CartAndItems = new CartAndItems()

  //Array for Form Fields to add new Product
  newProduct: Product = {
    productId: 0,
    productSku: "",
    productName: "",
    productDescription: "",
    productCategory: "",
    productCost: 0.0,
    productQty: 0,
    productRemoved: false,
    imageUrl: ""
  }

  NewDiscountedProduct: ProductAndDiscount = {

    productId: 0,
    productSku: "",
    productName: "",
    productDescription: "",
    productCategory: "",
    productCost: 0.0,
    productQty: 0,
    imageUrl: "",
    productRemoved: false,
    discountId: 0,
    discountDescription: "",
    discountPercentage: 0
  }

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private productService: ProductService,
    private tokenService: TokenStorageService,
    private cartAndItemsService: CartAndItemsService,
    private cartItemService: CartItemService) { }

  ngOnInit(): void {
    //add code for the update

    this.userId = this.tokenService.getUser().user_id;
    this.loadDiscountedProducts();
  }

  //Load all all Products
  loadProducts() {
    this.productService.getAllProductsService().subscribe(
      (response) => {

        //Loop to remove duplicated products if theres a discount for it
        for (let index = 0; index < this.allDiscountProducts.length; index++) {
          for (let index2 = 0; index2 < response.length; index2++) {
            if (this.allDiscountProducts[index].productId == response[index2].productId) {
              this.indexArray[this.saveIndex] = index;
              response.splice(index2, 1);
            }
          }
        }
        this.allProducts = response;
        //-- For Testing Remove later
        console.log("James testing");
        console.log(response);
      },
      (error) => {
        this.errorProductMsg = "Unable to get allProducts - Try later";
        console.log(this.errorProductMsg);
      }
    )
  }

  //Loads all Discounts
  loadDiscountedProducts() {
    this.productService.getAllDiscountsProductsService().subscribe(
      (response) => {
        this.allDiscountProducts = response;
        this.loadProducts();
      },
      (error) => {
        this.errorProductMsg = "Unable to get allDiscountProducts - Try later";
        console.log(this.errorProductMsg);
      }
    )
  }

  //-----Example A function to search product(s) on sale
  productOnSale() {
    //do something or get by a speciific discount/sale endpoint

  }

  goToProduct(productId: number) {
    this.router.navigate(['product-page/' + productId]);
  }

  loadCart() {
    this.cartAndItemsService.getCartAndItemsWithUserIdService(this.userId).subscribe({
      next: response => {
        this.cartAndItems = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  addToCart(productId: any) {
    let item = new CartItem();
    item.cartId = this.cartAndItems.cartId;
    item.productId = productId;
    item.cartQty = 1;
    item.cartItemId = -1;
    console.log(item);
    this.cartItemService.addNewItemService(item).subscribe({
      next: response => {

      },
      error: error => {
        console.log(error);
      }
    });
  }


}
