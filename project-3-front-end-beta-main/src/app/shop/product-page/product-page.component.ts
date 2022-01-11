import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CartAndItems, CartItem, ItemProductAndDiscount } from 'src/app/models/cart.model';
import { ProductAndDiscount } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartAndItemsService } from 'src/app/services/cart-and-items.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductAndDiscountService } from 'src/app/services/product-and-discount.service';
import {TokenStorageService} from "../../services/token-storage.service";
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent implements OnInit {
  productAndDiscount: ProductAndDiscount = new ProductAndDiscount();
  userId: any = 0;
  cartAndItems: CartAndItems = new CartAndItems();
  item: CartItem = new CartItem();
  productId: number = 0;
  counter = 0;
  title = "Initiating Testing";

  constructor(private productAndDiscountService: ProductAndDiscountService,
              private cartItemService: CartItemService,
              private cartAndItemsService: CartAndItemsService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    // let pId: string = this.activatedRoute.snapshot.paramMap.get("productId") == null ? "" :  this.activatedRoute.snapshot.paramMap.get("productId");
    this.userId = this.tokenService.getUser().user_id;
    let param = this.activatedRoute.snapshot.paramMap.get("productId");
    this.productId = (param == null) ? 0 : parseInt(param);
    console.log(this.productId);
    this.loadData();
  }
  loadData() {
    this.productAndDiscountService.getProductAndDiscountService(this.productId).subscribe({
      next: response => {
        console.log(response);
        this.productAndDiscount = response;
      },
      error: error => {
        console.log(error);
      }
    });
    // if(this.user.userId <= 0) this.user.userId = 1; //Remove this line if not testing
    console.log(this.userId);
    this.cartAndItemsService.getCartAndItemsWithUserIdService(this.userId).subscribe({
      next: response => {
        this.cartAndItems = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  updateCartItem() {
    this.item.cartId = this.cartAndItems.cartId;
    this.item.productId = this.productId;
    this.item.cartQty = this.counter;
    this.item.cartItemId = -1;
    console.log(this.item);
    this.cartItemService.addNewItemService(this.item).subscribe({
      next: response => {
        // this.goToCheckout()
        this.loadData();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }

  changeQuantity(item: ItemProductAndDiscount, event: any) {
    let newItem = new CartItem();
    newItem.cartItemId = item.cartItemId;
    newItem.cartId = item.cartId;
    newItem.productId = item.productId;
    newItem.cartQty = event.value;
    this.cartItemService.updateItemService(newItem).subscribe({
      next: response => {
        this.loadData();
      },
      error: err => {
      }
    });
  }

  increaseCount() {
    this.counter++;
    this.qtyChange();
  }
  decreaseCount() {
    this.counter--;
    this.qtyChange();
  }

  qtyChange() {
    if (this.counter > this.productAndDiscount.productQty) this.counter = this.productAndDiscount.productQty;
    else if (this.counter < 0) this.counter = 0;
    this.updateCartItem();
  }
}
