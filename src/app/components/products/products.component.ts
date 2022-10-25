import { Component, OnInit } from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }

  products!: IProducts[];
  productsSubscribtion!: Subscription;

  canEdit: boolean = false;

  ngOnInit(): void {
    this.canEdit=true;
    this.productsSubscribtion = this.ProductsService.getProducts().subscribe((data)=>
      this.products = data)
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width='500px';
    dialogConfig.disableClose=true;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      (data)=>
      {if(data)this.postData(data)}
      );
  }

  postData(data: IProducts){
    this.ProductsService.postProduct(data).subscribe(
      (data)=> this.products.push(data));
  }

  deleteItem(id: number){
    this.ProductsService.deleteProduct(id).subscribe(()=> this.products.find((item)=>
    {if(id===item.id){
      let idx = this.products.findIndex((data)=> data.id===id);
      this.products.splice(idx,1)}
    }
    ));
  }


  ngOnDestroy(){
    if(this.productsSubscribtion) this.productsSubscribtion.unsubscribe()
  }

}
