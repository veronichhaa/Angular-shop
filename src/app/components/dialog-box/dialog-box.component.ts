import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    image: new FormControl(''),
    subtitle: new FormControl(''),
    price: new FormControl(''),
    duration: new FormControl(''),
  });

  onSubmit(){

    this.data = {
      title: this.myForm.value.title,
      image: this.myForm.value.image,
      info:{
        subtitle: this.myForm.value.subtitle,
        price: this.myForm.value.price,
        duration: this.myForm.value.duration}}

    this.dialogRef.close(this.data);
  }

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {  }

}
