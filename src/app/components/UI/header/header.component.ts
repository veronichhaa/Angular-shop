import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(item=>{
      item.addEventListener("click", ()=>{
        buttons.forEach(item=>item.classList.remove("active"));
        item.classList.add("active");
      })
    })
  }


}
