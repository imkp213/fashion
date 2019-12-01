import { CartService } from "./services/cart.service";
import { Component } from "@angular/core";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "fashion";
  userName;
  cartCount;
  constructor(private userSer: UserService, private cartSer: CartService) {
    userSer.userName.subscribe(value => {
      this.userName = value;
    });

    cartSer.cartCount.subscribe(count => {
      this.cartCount = count;
    });
  }
}
