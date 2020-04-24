import { Injectable } from '@angular/core';
import { Product } from 'src/models/product';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ProductsService } from '../http/productsService.service';
import { map } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  // selectedProduct to produkt na ktory klikniemy w komponencie products, to pole w tym serwisie zostalo dodane w celu
  // zredukowania licbzy zapytań do backendu
  selectedProduct: Product;
  currentProvider: number;
  currentCategory: number = 0;
  isUserLoggedIn: boolean;
  shoppingCart: Product[] = [];
  // BehaviourSubject to taki typ Observabla który umożliwia programiście wysyłanie danych za pomocą funkcji next wtedy gdy jest to potrzebne
  // ponadto BehaviourSubjecta mozemy zainicjować jakąś początkową wartością w tym przypadku jest to pusta tablica
  productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor(private cookieService: CookieService,private productsService: ProductsService,
    private keycloakService: KeycloakService) {
    //this.cookieService.set('shopping-cart','');
    let shoppingCart=this.cookieService.get('shopping-cart');
    if(shoppingCart!=='' && shoppingCart!==null && typeof(shoppingCart)!=='undefined'){
    let productsFromCookie = JSON.parse(shoppingCart);

    this.productsService.getProductsList(null,false)
    .subscribe((products)=>{
      products.forEach((product)=>{
        productsFromCookie.forEach((elem)=>{
          if(product.productId===elem.productId){
            for(let i=0; i<elem.quantityOfProducts;i++){
              this.shoppingCart.push(product);
            }
          }
        })
      })
      this.cartSubject.next(this.shoppingCart);
    })

  }
  this.keycloakService.isLoggedIn().then((resp)=>{
    this.isUserLoggedIn = resp;
    console.log(this.isUserLoggedIn)
  },()=>{
    this.isUserLoggedIn = false;
    console.log(this.isUserLoggedIn)
  });
  }
}
