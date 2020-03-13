import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProvidersService } from 'src/services/http/providersService.service';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data/data.service';
import { ProductsService } from 'src/services/http/productsService.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit {

  providers = [];

  constructor(private providersService: ProvidersService,
    private router: Router,
    private dataService: DataService,
    private productService: ProductsService) { }

  ngOnInit(): void {
    const params= null;
    // pobieramy liste providerów
    this.providersService.getProvidersList(params,false).subscribe((data)=>{
      this.providers = data;
      // dodajemy opcje All
      this.providers.unshift({providerId:0,firstName:'Wszystko'});
    },
    (err)=>{console.log(err)});
  }

  filterByProviders(event){
    const params = null;
    // pobieramy liste produktow z backendu a nastepnie filtrujemy dane na podstawie providerId
    // event.index -> to index zaznaczonego providera z menu filters
    this.productService.getProductsList(params,false).pipe(
      map(products=>products.filter(product=>{
        if(event.index!==0){
          return product.providerId === event.index
        }else {
          return product;
        }
      }))
    ).subscribe(products=>{
      // po otrzymaniu przefiltrowanych danych przesyłamy je za pomocą behaviourSubjecta do componentu Products
      this.dataService.productsSubject.next(products);
      // teraz przechodzimy do componentu Products
      this.router.navigateByUrl('/products');
    })
  }

}
