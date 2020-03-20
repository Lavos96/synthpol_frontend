import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/services/data/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  methodOfPayment: string = '';
  methodsOfPayment: string[] = ['Przy pobraniu', 'Przelew', 'Blik'];

  constructor(private cookieService: CookieService,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  pay(){
    if(this.methodOfPayment!==''){
      this.dataService.shoppingCart = [];
      this.dataService.cartSubject.next(this.dataService.shoppingCart);
      this.cookieService.set('shopping-cart','');
      alert('Dziękujemy za dokonanie zakupów!');
      this.router.navigateByUrl('/products');
    }else{
      this.snackBar.open('Wybierz metodę płatności!','',{duration:2000})
    }
  }
}
