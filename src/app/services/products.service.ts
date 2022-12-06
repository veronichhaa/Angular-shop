import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProducts} from "../models/products";
import {IComments} from "../models/comments";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  url: string='http://localhost:3000/products';
  urlBasket: string='http://localhost:3000/basket';
  urlComments: string='http://localhost:3000/comments';

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

  updateProduct(product: IProducts){
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product)
  }


  getBasket(){
    return this.http.get<IProducts[]>(this.urlBasket);
  }

  postProductToBasket(product: IProducts){
    return this.http.post<IProducts>(this.urlBasket, product);
  }

  updateProductToBasket(product: IProducts){
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }

  deleteProductFromBasket(id: number){
    return this.http.delete<IProducts>(`${this.urlBasket}/${id}`);
  }


  getComments(){
    return this.http.get<IComments[]>(this.urlComments);
  }

  postComment(comment: IComments){
    return this.http.post<IComments>(this.urlComments, comment)
  }

}
