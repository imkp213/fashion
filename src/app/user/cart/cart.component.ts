import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { CartService } from "./../../services/cart.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  carts: any[];
  total;
  constructor(
    private cartService: CartService,
    private cookie: CookieService,
    private route: Router
  ) {
    this.cartService.totalCartAmnt.subscribe(value => {
      this.total = value;
    });
  }

  ngOnInit() {
    this.getCartsProducts();
  }

  getCartsProducts() {
    var user_id = this.cookie.get("_uid");
    this.cartService.getCartsProducts(user_id).subscribe(res => {
      if (res["status"] == true) {
        this.carts = res["data"];
        let temp = 0;
        this.carts.forEach(cart => {
          temp += parseInt(cart["cart_qty"]) * parseInt(cart["cart_price"]);
        });
        this.total = temp;
        this.cartService.total_cart_amnt.next(temp);
      }
    });
  }

  buyAll() {
    var formdata = new FormData();
    formdata.append("user_id", this.cookie.get("_uid"));
    this.cartService.buyAllProducts(formdata).subscribe(res => {
      if (res["status"] == true) {
        this.cartService.cart_count.next(0);
        this.cartService.total_cart_amnt.next(0);
        this.route.navigate(["/orders"]);
      }
    });
  }

  DeletedCart(pro) {
    var cart_id = pro["cart_id"];
    this.cartService.deleteCart(cart_id).subscribe(res => {
      if (res["status"] == true) {
        var lessAmount = pro["cart_qty"] * pro["cart_price"];
        this.cartService.changeTotalCartAmnt(lessAmount, "less");
        var oldCount = this.cartService.cart_count.getValue();
        this.cartService.changeCartCount(oldCount - 1);
        // alert(res["message"]);
        var loc = this.carts.indexOf(pro);
        this.carts.splice(loc, 1);
      }
    });
  }
}
