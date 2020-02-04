import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "./../../../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { CartService } from "./../../services/cart.service";
import { ProductsService } from "./../../services/products.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  product;
  number = 1;
  imageUrl = environment.imageBaseUrl;
  constructor(
    private activeRoute: ActivatedRoute,
    private proService: ProductsService,
    private cartService: CartService,
    private cookie: CookieService,
    private route: Router
  ) {
    var slug_key = this.activeRoute.snapshot.paramMap.get("slug");
    this.proService.getProductDetails(slug_key).subscribe(res => {
      if (res["status"] == true) {
        this.product = res["data"];
      }
    });
  }

  ngOnInit() {}

  decre() {
    if (this.number > 1) {
      this.number -= 1;
    }
  }

  incre() {
    if (this.number < 10) {
      this.number += 1;
    }
  }

  addToCart() {
    var user_id = this.cookie.get("_uid");
    var cartJson = {
      product_id: this.product["pro_id"],
      qty: this.number
    };
    if (user_id) {
      cartJson["user_id"] = user_id;

      this.cartService.addCart(cartJson).subscribe(res => {
        if (res["status"] == true) {
          // alert(res["message"]);
          this.cartService.getCartsProducts(user_id).subscribe(res => {
            if (res["status"] == true) {
              let cartsArr: any[] = res["data"];
              this.cartService.changeCartCount(cartsArr.length);
              this.route.navigate(["/cart"]);
            }
          });
        }
      });
    } else {
      alert("please logn first");
    }
  }
}
