import { UserService } from "./../../services/user.service";
import { CookieService } from "ngx-cookie-service";
import { CartService } from "./../../services/cart.service";
import { Component, OnInit, Input } from "@angular/core";
import { environment } from "./../../../environments/environment";

@Component({
  selector: "[app-grid]",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit {
  default_img = "assets/images/cloth_3.jpg";
  imageUrl = environment.imageBaseUrl;
  @Input() product;
  constructor(
    private cartService: CartService,
    private cookie: CookieService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  addToCart(pid) {
    var user_id = this.cookie.get("_uid");
    var cartJson = {
      product_id: pid
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
              // this.toast.success("", "Product added to cart!");
            }
          });
        }
      });
    } else {
      alert("please login first");
    }
  }
}
