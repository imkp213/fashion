import { ProductsService } from './../services/products.service';
import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products;
  loaded=false;
  constructor(private pro:ProductsService){}
  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.pro.getProducts().subscribe(res => {

      if(res['status']=true){
        this.products = res['data']['data'];
      }
      this.loaded = true;
    },error => {
      console.log(error);
    });
  }
}
