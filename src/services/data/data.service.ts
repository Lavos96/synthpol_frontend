import { Injectable } from '@angular/core';
import { Product } from 'src/models/product';
import { Subject, BehaviorSubject } from 'rxjs';
import { Category } from 'src/models/category';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // selectedProduct to produkt na ktory klikniemy w komponencie products, to pole w tym serwisie zostalo dodane w celu
  // zredukowania licbzy zapytań do backendu
  selectedProduct: Product;
  currentProvider: number;
  currentCategory: number = 0;
  // BehaviourSubject to taki typ Observabla który umożliwia programiście wysyłanie danych za pomocą funkcji next wtedy gdy jest to potrzebne
  // ponadto BehaviourSubjecta mozemy zainicjować jakąś początkową wartością w tym przypadku jest to pusta tablica
  productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor() {}

}
