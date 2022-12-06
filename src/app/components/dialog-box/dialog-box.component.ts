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
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? null),
    image: new FormControl(this.data?.image ?? null),
    subtitle: new FormControl(this.data?.info.subtitle ?? null),
    price: new FormControl(this.data?.info.price ?? null),
    duration: new FormControl(this.data?.info.duration ?? null),
  });

  onSubmit(){

    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title.toUpperCase(),
      image: this.myForm.value.image,
      info:{
        subtitle: this.myForm.value.subtitle.toUpperCase(),
        price: this.myForm.value.price,
        duration: this.myForm.value.duration.toUpperCase()}}

    this.dialogRef.close(this.data);
  }

  isNew: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    if(data){
      this.isNew=false;
    }
    else this.isNew=true;
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {  }

}
