import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  text1: String = `        Online shop - онлайн секонд-хенд оригинальных и уникальных вещей. Здесь вы сможете приобрести вещи люксовых брендов и найти винтажные айтемы, которые прекрасно подойдут в ваш гардероб и все это по очень приятной цене.`.toUpperCase();
  text2: String = `        Мы работаем с 2016 года и отправили более 1700 уникальных вещей довольным покупателям.
        Все Вещи в хорошем, отличном или новом состоянии и проверены на оригинальность
        Основная филисофия нашего магазина “Потребляй разумно”`.toUpperCase();

}
