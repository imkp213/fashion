import { environment } from "./../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./../services/products.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  products;
  imageUrl = environment.imageBaseUrl;
  carouselOptions = {
    center: false,
    items: 1,
    loop: false,
    stagePadding: 15,
    margin: 20,
    nav: true,
    dots: false,
    navText: [
      '<span class="ishop icon-arrow_back">',
      '<span class="ishop icon-arrow_forward">'
    ],
    responsive: {
      600: {
        margin: 20,
        items: 2
      },
      1000: {
        margin: 20,
        items: 3
      },
      1200: {
        margin: 20,
        items: 3
      }
    }
  };
  constructor(private pro: ProductsService) {}

  ngOnInit() {
    this.pro.getProducts().subscribe(
      res => {
        if ((res["status"] = true)) {
          this.products = res["data"]["data"];
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
