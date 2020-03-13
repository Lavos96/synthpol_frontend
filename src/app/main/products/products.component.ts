import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductsService } from 'src/services/http/productsService.service';
import { DataService } from 'src/services/data/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductsService,
    private dataService: DataService,) { }

  ngOnInit(): void {
    const params = null;
    // subksrybujemy się do behaviourSubjecta z serwisu dataService
    // jesli tablica jaką od niego dostaniemy ma length wiekszy od zera to przypisujemy ja do products w celu wyswietlenia w templatce
    // w przeciwnym razie wykonujemy zapytanie na backend
    this.dataService.productsSubject.subscribe(products=>{
      if(products.length!==0){
        this.products = products;
      } else {
        this.productService.getProductsList(params,false).subscribe((data)=>{
          this.products = data;
        });
      }
    });
  }

}
