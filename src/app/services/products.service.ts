import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProducts} from "../models/products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  url: string='http://localhost:3000/products';

  getProducts(){
    return this.http.get<IProducts[]>(this.url);
  }

  postProduct(product: IProducts){
    return this.http.post<IProducts>(this.url, product);
  }

  getProduct(id: number){
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  deleteProduct(id: number){
    return this.http.delete<IProducts>(`${this.url}/${id}`);
  }
}
