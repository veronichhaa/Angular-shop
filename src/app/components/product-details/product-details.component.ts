import { Component, OnInit } from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  product!: IProducts;
  productsSubscribtion!: Subscription;

  ngOnInit(): void {
    this.productsSubscribtion = this.route.data.subscribe((data)=>{
      this.product = data['data'];
    });
  }
}
