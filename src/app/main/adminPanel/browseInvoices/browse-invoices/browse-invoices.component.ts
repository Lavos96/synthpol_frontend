import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { OrdersService } from 'src/services/http/ordersService.service';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from 'src/models/invoice';
import { Product } from 'src/models/product';
import { ProductsService } from 'src/services/http/productsService.service';
import { InvoicesService } from 'src/services/http/invoicesService.service';
import { saveAs } from 'file-saver';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data/data.service';

export interface InvoiceElement {
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  zipCode: string;
  nip: string;
  totalCost: string;
}


@Component({
  selector: 'app-browse-invoices',
  templateUrl: './browse-invoices.component.html',
  styleUrls: ['./browse-invoices.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class BrowseInvoicesComponent implements OnInit {

  dataSource: MatTableDataSource<Invoice> = new MatTableDataSource();
  columnsToDisplay = ['name', 'city', 'street', 'zipCode', 'nip'];
  expandedElement: InvoiceElement | null;
  products: Product[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private ordersService: OrdersService,
    private productsService: ProductsService,
    private invoicesService: InvoicesService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.invoicesService.getInvoicesList(null, false).subscribe((data) => {
      data = data.filter(element=> element.shallDisplay===true );
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      // THIS IS USED WHEN OPERATING ON MOCK DATA
      //   this.productsService.getProductsList(null, false).subscribe((data) => {
      //     this.products = data;
      //   })
    })
  }

  displayProductsnvoiceName(id: number, quantity: number, attributeToDisplay: string): string {
    const product = this.products.find((product) => {
      return product.productId === id;
    })
    if (product) {
      return product[attributeToDisplay];
    } else {
      return '';
    }
  }

  displayTotalCost(postOrders: { productId: number, quantityOfProducts: number }[]) {
    let totalCost: number = 0;
    let product: Product = null;
    for (let i = 0; i < postOrders.length; i++) {
      product = this.products.find((product) => {
        return product.productId === postOrders[i].productId;
      })
      if (product) {
        totalCost += product.nettoPrice * postOrders[i].quantityOfProducts;
      }
    }
    return totalCost;
  }

  downloadEdiInvoice(id:number){
    this.invoicesService.getInvoiceEdiById({responseType: 'text'},id,false).subscribe((ediInvoice)=>{
      var blob = new Blob([ediInvoice], {type: "text/plain;charset=utf-8"});
      saveAs(blob, `faktura${id}.txt`);
    })
  }

  moveToEditInvoice(invoice){
    console.log('Do edycji: ', invoice);
    this.dataService.editInvoice = invoice;
    this.router.navigateByUrl('editInvoice');
  }

  deleteInvoice(invoice){
    this.invoicesService.deleteInvoice(null,invoice.invoiceId,false).subscribe(resp=>{
      console.log('Deleted: ', resp);
      this.ngOnInit();
    })
  }

}
