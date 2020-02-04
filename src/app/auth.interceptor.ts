import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookie: CookieService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookie.get("_token");
    // console.log("hello", token);
    if (!token) {
      return next.handle(req);
    }
    // console.log("hello", token);

    var headers_object = new HttpHeaders().set(
      "Authorization",
      `Bearer ${token}`
    );
    const req1 = req.clone({
      headers: headers_object
    });
    return next.handle(req1);
  }
}
