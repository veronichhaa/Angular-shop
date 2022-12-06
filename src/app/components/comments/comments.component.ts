import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {IComments} from "../../models/comments";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {MatCalendar} from "@angular/material/datepicker";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private ProductsService: ProductsService) { }

  comments!: IComments[];
  commentsSubscription!: Subscription;

  visibility: boolean = false;

  newComment: FormGroup = new FormGroup({
    name: new FormControl(''),
    text: new FormControl('')

  })

  ngOnInit(): void {
    this.commentsSubscription = this.ProductsService.getComments().subscribe(
      (data)=>this.comments=data
    );
  }

  show(){
   this.visibility=!this.visibility;
  }

  addComment(){
    let now = new Date().toLocaleDateString();
    let comment = {
      name: this.newComment.value.name,
      date: now,
      text: this.newComment.value.text
    }

     console.log(comment)
    this.ProductsService.postComment(comment).subscribe((data) => this.comments.push(data))
  }

}
