import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data/data.service';
import { CookieService } from 'ngx-cookie-service';
import { ReduceCartCookieSize } from 'src/services/reduceCartCookieSize.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  headerImage:SafeStyle;

  constructor(private router: Router,
    private dataService: DataService,
    private cookieService: CookieService,
    private reduceCartCookieSize: ReduceCartCookieSize,
    private sanitization: DomSanitizer) { }

  @Input() product: Product;

  ngOnInit(): void {
    switch(this.product.providerId){
      case 1:
        this.headerImage=this.sanitization.bypassSecurityTrustStyle(`url(/assets/olimplogo.png)`);
        break;
      case 2:
        this.headerImage=this.sanitization.bypassSecurityTrustStyle(`url(/assets/aptonia.jpg)`);
        break;
      case 3:
        this.headerImage=this.sanitization.bypassSecurityTrustStyle(`url(/assets/weiderlogo.png)`);
        break;
      default:
        this.headerImage=this.sanitization.bypassSecurityTrustStyle(`url(/assets/olimplogo.png)`);
        break;
    }
  }

  moveToDetails(){
    this.dataService.selectedProduct = this.product;
    this.router.navigateByUrl(`/product/${this.product.productId}`);
  }

  addToCart(){
    this.dataService.shoppingCart.push(this.product);
    //console.log('Cookie Size: ',(new TextEncoder().encode(JSON.stringify(this.dataService.shoppingCart))).length);
    this.dataService.cartSubject.next(this.dataService.shoppingCart);
    //console.log('Cookie Size after reduction: ',(new TextEncoder().encode(JSON.stringify(this.reduceCartCookieSize.reduceSizeOfCookie()))));
    this.cookieService.set('shopping-cart',this.reduceCartCookieSize.reduceSizeOfCookie(),1);
  }

}
