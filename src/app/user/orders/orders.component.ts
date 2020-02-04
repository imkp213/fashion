import { environment } from "./../../../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  orders;
  default_img = "assets/images/cloth_3.jpg";
  imageUrl = environment.imageBaseUrl;
  constructor(
    private userService: UserService,
    private cookie: CookieService
  ) {}

  ngOnInit() {
    var id = this.cookie.get("_uid");
    this.userService.userOrders(id).subscribe(res => {
      if (res["status"] == true) {
        this.orders = res["data"];
      }
    });
  }
}
