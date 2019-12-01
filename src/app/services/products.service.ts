import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class ProductsService {
  imageUrl: string = environment.imageBaseUrl;
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.apiBaseUrl + "get-all-products");
  }

  getProductDetails(id) {
    return this.http.get(this.apiBaseUrl + "get-product-details/" + id);
  }
}
