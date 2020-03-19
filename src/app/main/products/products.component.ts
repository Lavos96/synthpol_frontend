import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductsService } from 'src/services/http/productsService.service';
import { DataService } from 'src/services/data/data.service';
import { MatDrawer } from '@angular/material/sidenav';
import { CategoriesService } from 'src/services/http/categoriesService.service';
import { Category } from 'src/models/category';
import { map } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  showFiller = false;
  currentCategory: string;
  currentCat: Category;
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('select') select: MatSelect;

  constructor(private productService: ProductsService,
    private dataService: DataService,
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    const params = null;
    // subksrybujemy się do behaviourSubjecta z serwisu dataService
    // jesli tablica jaką od niego dostaniemy ma length wiekszy od zera to przypisujemy ja do products w celu wyswietlenia w templatce
    // w przeciwnym razie wykonujemy zapytanie na backend
    this.dataService.productsSubject.subscribe(products => {
      if (products.length !== 0) {
        this.products = products;
      } else if (this.dataService.currentCategory !== 0 && products.length === 0) {
        this.products = products;
      } else {
        this.productService.getProductsList(params, false).subscribe((data) => {
          this.products = data;
        });
      }
    });

    this.categoriesService.getCategoriesList(null, false).subscribe(categories => {

      this.categories = categories;
      this.currentCat = this.categories.find(elem=>{
        if(this.dataService.currentCategory!==0){
        return elem.categoryId===this.dataService.currentCategory
        }
      })
      if(typeof(this.currentCat) !== 'undefined'){
      this.currentCategory = this.currentCat.categoryName;
      }
    })
  }

  changeCategory(event) {
    //console.log(event.value);
    if (event !== null) {
      const category = this.categories.find(cat => {
        return cat.categoryName === event.value;
      })
      this.dataService.currentCategory = category.categoryId;

      this.productService.getProductsList(null, false).pipe(
        map(products => products.filter(product => {
          if (this.dataService.currentProvider !== 0) {
            return ((product.categoryId === category.categoryId) && product.providerId === this.dataService.currentProvider);
          } else {
            return product.categoryId === category.categoryId;
          }
        }))
      ).subscribe(products => {
        this.dataService.productsSubject.next(products);
        this.products = products;
      })
    } else {
      this.productService.getProductsList(null, false).pipe(
        map(products => products.filter(product => {
          if (this.dataService.currentProvider !== 0) {
            return product.providerId === this.dataService.currentProvider;
          } else {
            return product;
          }
        }))
      ).subscribe(products => {
        this.dataService.productsSubject.next(products);
        this.products = products;
      })
    }
  }

  clearCategoryFilter() {
    this.select.value = undefined;
    this.dataService.currentCategory = 0;
    this.changeCategory(null);
  }

}
