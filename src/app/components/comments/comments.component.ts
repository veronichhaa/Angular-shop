import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {IComments} from "../../models/comments";
import {Subscription} from "rxjs";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
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
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    text: new FormControl('', [Validators.minLength(10), Validators.required, this.createCensorValidator()])

  })

  createCensorValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let valid = true;
      console.log(control.value)
      if(control.value.match('иэф'))
      {
        valid = false;
      }
      return !valid ? {textValid:false} : null;
    };
  }


  get name(){
    return this.newComment.get('name');
  }

  get text(){
    return this.newComment.get('text');
  }

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
