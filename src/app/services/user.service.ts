import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private user_name = new BehaviorSubject("");
  userName = this.user_name.asObservable();

  private user_id = new BehaviorSubject("");
  userId = this.user_id.asObservable();

  apiBaseUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient, private cookie: CookieService) {}

  saveUser(data) {
    return this.http.post(this.apiBaseUrl + "save-user", data);
  }

  changeUserName(name: any, id: any) {
    this.user_name.next(name);
    this.user_id.next(id);
  }

  loginUser(data) {
    return this.http.post(this.apiBaseUrl + "user-login", data);
  }

  getUserById(id) {
    return this.http.get(this.apiBaseUrl + "user-details/" + id);
  }

  IsLoggedIn() {
    if (this.cookie.get("_uid")) {
      return true;
    }
  }

  userOrders(id) {
    var auth_token = this.cookie.get("_token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${auth_token}`
    });
    return this.http.get(this.apiBaseUrl + "user-orders/" + id, {
      headers: headers
    });
  }
}
