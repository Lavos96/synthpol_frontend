import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './main/products/product-details/product-details/product-details.component';
import { ProductsComponent } from './main/products/products.component';
import { CartComponent } from './main/cart/cart/cart.component';
import { CheckoutComponent } from './main/cart/cart/checkout/checkout/checkout.component';
import { AppAuthGuard } from 'src/services/appAuthGuard.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: '', 
    //loadChildren: () => SomeOtherModule ,
    redirectTo: '',
    pathMatch: 'full',
    component: AppComponent,
    canActivate: [AppAuthGuard], 
    data: { roles: ['admin', 'employer'] }
  },
  {path:'product/:id', component: ProductDetailsComponent},
  {path:'products', component: ProductsComponent},
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
