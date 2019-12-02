import { CartService } from "./../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "./../../services/user.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  success_message;
  error_message;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookie: CookieService,
    private route: Router,
    private cartService: CartService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.loginUser(this.loginForm.value).subscribe(
      res => {
        if (res["status"] == true) {
          // this.loginForm.reset();
          // console.log(res["data"]);
          // return false;
          var user = res["data"];
          this.submitted = false;
          this.userService.changeUserName(user["name"], user["id"]);

          this.cartService.getCartsProducts(user["id"]).subscribe(res => {
            if (res["status"] == true) {
              let cartsArr: any[] = res["data"];
              this.cartService.changeCartCount(cartsArr.length);
            }
          });

          this.cookie.set("_uid", user["id"]);
          this.cookie.set("_token", res["token"]);
          this.success_message = "You successfully logged in..";
          this.route.navigate(["/"]);
        } else {
          this.error_message = res["message"];
        }

        var fn = this;
        setTimeout(function() {
          fn.success_message = "";
          fn.error_message = "";
        }, 2000);
      },
      error => {
        console.log(error);
      }
    );
  }
}
