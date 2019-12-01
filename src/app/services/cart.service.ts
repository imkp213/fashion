import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CartService {
  cart_count = new BehaviorSubject(0);
  cartCount = this.cart_count.asObservable();

  total_cart_amnt = new BehaviorSubject(0);
  totalCartAmnt = this.total_cart_amnt.asObservable();
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private cookie: CookieService) {}

  addCart(cartJson) {
    return this.http.post(this.apiBaseUrl + "add-to-cart", cartJson);
  }

  changeCartCount(count: any) {
    this.cart_count.next(count);
  }

  changeTotalCartAmnt(amnout, type) {
    var oldTotal;
    oldTotal = this.total_cart_amnt.getValue();
    if (type == "add") {
      this.total_cart_amnt.next(oldTotal + amnout);
    } else {
      this.total_cart_amnt.next(oldTotal - amnout);
    }
  }

  getCartsProducts(user_id) {
    return this.http.get(this.apiBaseUrl + "get-cart-products/" + user_id);
  }

  cartUpdate(cartJson) {
    return this.http.put(this.apiBaseUrl + "add-to-cart", cartJson);
  }

  deleteCart(cart_id) {
    return this.http.delete(this.apiBaseUrl + "delete-cart/" + cart_id);
  }

  buyAllProducts(form) {
    return this.http.post(this.apiBaseUrl + "check-out", form);
  }
}
