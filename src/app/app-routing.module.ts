import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './main/products/product-details/product-details/product-details.component';
import { ProductsComponent } from './main/products/products.component';

const routes: Routes = [
  {path:'product/:id', component: ProductDetailsComponent},
  {path:'products', component: ProductsComponent},
  {path:'', component: ProductsComponent, pathMatch: 'full'},
  {path:'**', component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
