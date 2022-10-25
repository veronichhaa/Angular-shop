import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { BaseComponent } from './components/base/base.component';
import { BasketComponent } from './components/basket/basket.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BaseComponent,
    BasketComponent,
    DialogBoxComponent,
    ProductsComponent,
    ProductDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
