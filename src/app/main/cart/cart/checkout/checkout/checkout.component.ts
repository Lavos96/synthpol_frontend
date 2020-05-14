import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/services/data/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReduceCartCookieSize } from 'src/services/reduceCartCookieSize.service';
import { Invoice } from 'src/models/invoice';
import { InvoicePersonalInfo } from 'src/models/invoicePersonalInfo';
import { OrdersService } from 'src/services/http/ordersService.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  methodOfPayment: string = '';
  methodsOfPayment: string[] = ['Przy pobraniu', 'Przelew', 'Blik'];
  postOrders: [{ productId: number, quantityOfProducts: number }];
  invoice: InvoicePersonalInfo;

  constructor(private cookieService: CookieService,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private reduceCardSizeService: ReduceCartCookieSize,
    private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.dataService.orderFormSubject.subscribe((orderPersonalInfo) => {
      console.log('Przyszło: ', orderPersonalInfo);
      this.invoice = orderPersonalInfo;
    });
    this.dataService.cartSubject.subscribe((data) => {
      console.log('data: ', data);
      this.postOrders = JSON.parse(this.reduceCardSizeService.reduceSizeOfCookie());
    });
  }

  pay() {
    if (this.methodOfPayment !== '') {
      const invoice = new Invoice(this.invoice, this.postOrders);
      console.log('Fakturka do wysłania: ', invoice);
      this.ordersService.postOrder(null, false, invoice).subscribe((resp) => {
        console.log('Odpowiedź posta: ', resp);
        this.dataService.shoppingCart = [];
        this.dataService.cartSubject.next(this.dataService.shoppingCart);
        this.cookieService.set('shopping-cart', '');
        alert('Dziękujemy za dokonanie zakupów!');
        this.router.navigateByUrl('/products');
      })
    } else {
      this.snackBar.open('Wybierz metodę płatności!', '', { duration: 2000 })
    }
  }
}
