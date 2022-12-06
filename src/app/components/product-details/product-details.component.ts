import { Component, OnInit } from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ProductsService: ProductsService) { }

  product!: IProducts;
  productsSubscription!: Subscription;
  basket!: IProducts[];
  basketSubscription!: Subscription;

  ngOnInit(): void {
    this.productsSubscription = this.route.data.subscribe((data)=>{
      this.product = data['data'];
    });
    this.basketSubscription = this.ProductsService.getBasket().subscribe((data)=>
      this.basket = data)
  }

  addToBasket(product: IProducts){
    let findItem;
    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id)
      if(findItem) this.updateToBasket(product)
      else this.postToBasket(product)
    } else {
      this.postToBasket(product)
    }

  }

  postToBasket(product: IProducts){
    product.quantity=1;
    this.ProductsService.postProductToBasket(product).subscribe(
      (data)=>{
        this.basket.push(data)
      });
  }

  updateToBasket(product: IProducts){
    product.quantity+=1;
    this.ProductsService.updateProductToBasket(product).subscribe((data)=>{});
    console.log(product.quantity);
  }

  // ngOnDestroy(){
  //   if(this.productsSubscription) this.productsSubscription.unsubscribe();
  //   if(this.basketSubscription) this.basketSubscription.unsubscribe();
  // }


}
