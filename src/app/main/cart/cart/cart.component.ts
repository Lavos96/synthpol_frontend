import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataService } from 'src/services/data/data.service';
import { Product } from 'src/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ReduceCartCookieSize } from 'src/services/reduceCartCookieSize.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['Zdjecie','Nazwa', 'Cena','Usun'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dataService:DataService,
    private cookieService: CookieService,
    private reduceCartCookieSize: ReduceCartCookieSize,
    private router: Router,
    private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.dataService.cartSubject.subscribe((cart)=>{
      if(cart.length > 0) {
        this.dataService.shoppingCart = cart;
        this.dataSource.data = this.dataService.shoppingCart;
        this.dataSource.paginator = this.paginator;
      } else {
        this.dataSource.data = [];
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  /** łączny koszt produktów z koszyka */
  getTotalCost(): number {
    let totalPrice:number =0;
    this.dataService.shoppingCart.forEach((product)=>{
      totalPrice+=product.nettoPrice;
    })
    return totalPrice;
  }

  removeItemFromCart(element: Product){
    const index = this.dataService.shoppingCart.indexOf(element);
    if (index > -1) {
    this.dataService.shoppingCart.splice(index, 1);
    }
    this.cookieService.set('shopping-cart',this.reduceCartCookieSize.reduceSizeOfCookie(),1);
    this.dataService.cartSubject.next(this.dataService.shoppingCart);
  }

  moveToCheckout(){
    if(this.dataService.isUserLoggedIn){
      this.router.navigateByUrl('/checkout');
    } else {
      this.keycloakService.login();
    }
  }

}
