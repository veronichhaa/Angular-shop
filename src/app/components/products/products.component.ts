import { Component, OnInit } from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import{PriceFilterPipe} from "../../pipes/pricefilter.pipe";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }

  products!: IProducts[];
 // basket!: IProducts[];
  productsSubscription!: Subscription;
  // basketSubscription!: Subscription;

  price:number = 500;
  search:string='';

  canEdit: boolean = false;

  toggleAdm(){
    this.canEdit=!this.canEdit;
    if(this.canEdit){
      document.querySelector('#adm')!.innerHTML="РЕЖИМ ПОЛЬЗОВАТЕЛЯ";
    }
    else{
      document.querySelector('#adm')!.innerHTML="РЕЖИМ АДМИНИСТРАТОРА";
    }
  }

  ngOnInit(): void {
    this.canEdit=false;
    this.productsSubscription = this.ProductsService.getProducts().subscribe((data)=>
      this.products = data)
    // this.basketSubscription = this.ProductsService.getBasket().subscribe((data)=>
    //   this.basket = data)
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width='500px';
    dialogConfig.disableClose=true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      (data)=>
      {
        if(data){
          if(data.id){
            this.updateData(data);
          }
          else(this.postData(data))
        }
      });
  }

  updateData(data: IProducts){
    this.ProductsService.updateProduct(data).subscribe(
      (data)=> this.products = this.products.map((product)=> {
        if (product.id === data.id) return data;
        else return product;
      }));
  }

  postData(data: IProducts){
    this.ProductsService.postProduct(data).subscribe(
      (data)=> this.products.push(data));
  }

  deleteItem(id: number){
    this.ProductsService.deleteProduct(id).subscribe(()=> this.products.find((item)=>
    {
      if(id===item.id){
      let idx = this.products.findIndex((data)=> data.id===id);
      this.products.splice(idx,1);
      }
    }));
  }

  // addToBasket(product: IProducts){
  //   let findItem;
  //   if (this.basket.length > 0) {
  //     findItem = this.basket.find((item) => item.id === product.id)
  //     if(findItem) this.updateToBasket(product)
  //     else this.postToBasket(product)
  //   } else {
  //     this.postToBasket(product)
  //   }
  //
  // }
  //
  // postToBasket(product: IProducts){
  //   product.quantity=1;
  //   this.ProductsService.postProductToBasket(product).subscribe(
  //     (data)=>{
  //       this.basket.push(data)
  //     });
  // }
  //
  // updateToBasket(product: IProducts){
  //   product.quantity+=1;
  //   this.ProductsService.updateProductToBasket(product).subscribe((data)=>{});
  // }



  ngOnDestroy(){
    if(this.productsSubscription) this.productsSubscription.unsubscribe();
    // if(this.basketSubscription) this.basketSubscription.unsubscribe();
  }

}
