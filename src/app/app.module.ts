import { AuthInterceptor } from "./auth.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { CartComponent } from "./user/cart/cart.component";
import { OrdersComponent } from "./user/orders/orders.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ProductSliderComponent } from "./product-slider/product-slider.component";
import { DetailComponent } from "./product/detail/detail.component";
import { GridComponent } from "./product/grid/grid.component";
import { OwlModule } from "ngx-owl-carousel";
import { CartRowComponent } from "./user/cart-row/cart-row.component";
import { ProductsService } from "./services/products.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginRegisterComponent } from "./user/login-register/login-register.component";
import { UserService } from "./services/user.service";
import { CartService } from "./services/cart.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    OrdersComponent,
    HeaderComponent,
    FooterComponent,
    ProductSliderComponent,
    DetailComponent,
    GridComponent,
    CartRowComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsService,
    UserService,
    CartService,
    CookieService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
