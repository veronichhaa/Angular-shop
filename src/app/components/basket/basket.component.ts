import { Component, OnInit } from '@angular/core';
import {IProducts} from "../../models/products";
import {ProductsService} from "../../services/products.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private ProductsService: ProductsService) {}

  basketSubscription!: Subscription;
  basket!: IProducts[];
  sum!: number;

  orderForm: FormGroup = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.email]),
      tel: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{12}")]),
  })

  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.getBasket().subscribe(
      (data)=> {
        this.basket=data
      }
    )

  }

  get name(){
    return this.orderForm.get('name');
  }

  get surname(){
    return this.orderForm.get('surname');
  }

  get address(){
    return this.orderForm.get('address');
  }

  get tel(){
    return this.orderForm.get('tel');
  }


  get total(){
    return this.basket.reduce((sum, x)=>sum+x.info.price*x.quantity, 0);
  }

  openDialog(){
    this.basket.forEach(item=>this.deleteProduct(item.id));
    let dialog = document.querySelector('dialog');
    if (dialog){
      dialog.showModal()
    }
  }

  closeDialog(){
    let dialog = document.querySelector('dialog');
    if(dialog){
      dialog.close();
    }
  }

  incQuantity(product: IProducts){
    product.quantity++;
    this.basketSubscription = this.ProductsService.updateProductToBasket(product).subscribe(
      (data)=> this.basket = this.basket.map((product)=> {
        if (product.id === data.id) return data;
        else return product;
      }))
  };

  decQuantity(product: IProducts){
    if(product.quantity!=1){
      product.quantity--;
      this.basketSubscription = this.ProductsService.updateProductToBasket(product).subscribe(
        (data)=> this.basket = this.basket.map((product)=> {
          if (product.id === data.id) return data;
          else return product;
        }))
    }
  };

  deleteProduct(id: number){
    this.ProductsService.deleteProductFromBasket(id).subscribe(()=> this.basket.find((item)=>
    {
      if(id===item.id){
        let idx = this.basket.findIndex((data)=> data.id===id);
        this.basket.splice(idx,1);
      }
    }));
  }

}
