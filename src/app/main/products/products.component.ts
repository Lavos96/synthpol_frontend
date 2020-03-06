import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  products = [
    new Product('Odżywka','assets/odzywka-biotech.jpg','Opis produktu fajnego he he',50.99),
    new Product('Odżywka 1','assets/odzywka-biotech.jpg','Opis produktu numer 1 fajnego he he',69.99),
    new Product('Odżywka 2','assets/odzywka-biotech.jpg','Opis produktu numer 2 fajnego he he. Przesyłam info.',45.99),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
