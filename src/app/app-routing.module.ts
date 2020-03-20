import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './main/products/product-details/product-details/product-details.component';
import { ProductsComponent } from './main/products/products.component';
import { CartComponent } from './main/cart/cart/cart.component';
import { CheckoutComponent } from './main/cart/cart/checkout/checkout/checkout.component';

const routes: Routes = [
  {path:'product/:id', component: ProductDetailsComponent},
  {path:'products', component: ProductsComponent},
  {path:'cart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'', component: ProductsComponent, pathMatch: 'full'},
  {path:'**', component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
