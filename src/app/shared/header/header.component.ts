import { Component, OnInit, Input } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "./../../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "./../../services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Input() userName;
  @Input() cartCount;

  constructor(
    private cookie: CookieService,
    private userService: UserService,
    private cartService: CartService,
    private route: Router
  ) {
    if (this.cookie.get("_uid")) {
      var userId = this.cookie.get("_uid");
      this.userService.getUserById(userId).subscribe(res => {
        if (res["status"] == true) {
          var user = res["data"]["user"];
          this.userService.changeUserName(user["name"], user["id"]);
        }
      });

      this.cartService.getCartsProducts(userId).subscribe(res => {
        if (res["status"] == true) {
          let cartsArr: any[] = res["data"];
          this.cartService.changeCartCount(cartsArr.length);
        }
      });
    }
  }

  ngOnInit() {}

  logout() {
    this.cookie.delete("_uid");
    this.userService.changeUserName("", "");
    this.cartService.changeCartCount(0);
    this.route.navigate(["/"]);
  }
}
