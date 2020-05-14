import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './main/products/product-details/product-details/product-details.component';
import { ProductsComponent } from './main/products/products.component';
import { CartComponent } from './main/cart/cart/cart.component';
import { CheckoutComponent } from './main/cart/cart/checkout/checkout/checkout.component';
import { AppAuthGuard } from 'src/services/appAuthGuard.service';
import { AppComponent } from './app.component';
import { OrderFormComponent } from './main/cart/cart/orderForm/order-form/order-form.component';
import { BrowseInvoicesComponent } from './main/adminPanel/browseInvoices/browse-invoices/browse-invoices.component';
import { EditInvoiceComponent } from './main/adminPanel/editInvoice/edit-invoice/edit-invoice.component';

const routes: Routes = [
  { 
    path: '', 
    //loadChildren: () => SomeOtherModule ,
    redirectTo: '',
    pathMatch: 'full',
    component: AppComponent,
    canActivate: [AppAuthGuard], 
    data: { roles: ['admin', 'user'] }
  },
  {path:'product/:id', component: ProductDetailsComponent},
  {path:'products', component: ProductsComponent},
  {path:'orderForm', component: OrderFormComponent},
  {path:'browseInvoices', component: BrowseInvoicesComponent, canActivate: [AppAuthGuard], 
  data: { roles: ['admin'] }},
  {path:'editInvoice', component: EditInvoiceComponent, canActivate: [AppAuthGuard], 
  data: { roles: ['admin'] }},
  {path:'cart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'', component: ProductsComponent, pathMatch: 'full'},
  {path:'**', component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
