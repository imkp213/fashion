import { CookieService } from "ngx-cookie-service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { environment } from "./../../../environments/environment";
import { CartService } from "./../../services/cart.service";
@Component({
  selector: "[app-cart-row]",
  templateUrl: "./cart-row.component.html",
  styleUrls: ["./cart-row.component.css"]
})
export class CartRowComponent implements OnInit {
  @Input() product;
  @Output() deleteCartProduct = new EventEmitter();

  default_img = "assets/images/cloth_3.jpg";
  imageUrl = environment.imageBaseUrl;
  userId;
  constructor(private cartService: CartService, private cookie: CookieService) {
    this.userId = this.cookie.get("_uid");
  }

  ngOnInit() {}

  increment() {
    if (this.product.cart_qty < 10) {
      this.product.cart_qty = this.product.cart_qty + 1;
      // this.amount_change.emit(this.product.cart_price);
      this.updatecart();
      this.cartService.changeTotalCartAmnt(this.product.cart_price, "add");
    }
  }

  decrement() {
    if (this.product.cart_qty > 1) {
      this.product.cart_qty = this.product.cart_qty - 1;
      this.updatecart();
      this.cartService.changeTotalCartAmnt(this.product.cart_price, "less");
    }
  }

  updatecart() {
    var user_id = this.userId;
    var cartJson = {
      product_id: this.product.cart_pro_id,
      qty: this.product.cart_qty,
      user_id: user_id
    };

    if (user_id) {
      cartJson["user_id"] = user_id;
      this.cartService.cartUpdate(cartJson).subscribe(res => {
        if (res["status"] == true) {
          this.changeCartData();
        }
      });
    }
  }

  changeCartData() {
    this.cartService.getCartsProducts(this.userId).subscribe(res => {
      if (res["status"] == true) {
        let cartsArr: any[] = res["data"];
        this.cartService.changeCartCount(cartsArr.length);
      }
    });
  }

  deleteCart() {
    // var cart_id = this.product.cart_id;
    // this.cartService.deleteCart(cart_id).subscribe(res => {
    //   if (res["status"] == true) {
    //     this.changeCartData();
    //   }
    // });

    this.deleteCartProduct.emit(this.product);
  }
}
