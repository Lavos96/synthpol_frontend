import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/models/product';
import { DataService } from 'src/services/data/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/services/http/productsService.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product;
  private routeSub: Subscription;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location) { }

  ngOnInit(): void {
    // jesli w dataService wybrany produkt nie jest nullem i nie jest undefined to pobierz z niego wartosc do wyswietlenia w templacte
    // w przeciwnym razie wykonaj zapytannie na backend o konkretny produkt do wyświetlenia
    // zrobiłem taki zabieg żeby zredukować liczbe zapytań do backendu
    if(this.dataService.selectedProduct !== null && this.dataService.selectedProduct !== undefined){
    this.product = this.dataService.selectedProduct;
    } else {
    // zasuksrybuj się do ActivatedRoute w celu pobrania wartosci doklejonych do url
    this.routeSub = this.route.params.subscribe(params => {
      //console.log(params) //log the entire params object
      //console.log(params['id']) //log the value of id
      const parameters = null;
      // params['id'] <- id doklejone do url
      this.productsService.getProductById(parameters,params['id'],false).subscribe(data=>{
        this.product = data;
      })
    });
  }
  }

  comeBackShopping(){
    this.location.back();
  }

  ngOnDestroy(): void {
    // jesli subskrybcja do wartosci doklejonych do url istnieje to sie odsubskrybuj zeby nie bylo wycieków pamięci
    if(this.routeSub){
    this.routeSub.unsubscribe();
    }
  }

}
