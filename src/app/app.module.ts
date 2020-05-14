import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Components
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { FiltersComponent } from './main/filters/filters.component';
import { ProductsComponent } from './main/products/products.component';
import { FooterComponent } from './main/footer/footer.component';
import { ProductComponent } from './main/products/product/product.component';
//Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './main/products/product-details/product-details/product-details.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';
import {MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './main/cart/cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CheckoutComponent } from './main/cart/cart/checkout/checkout/checkout.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { KeycloakService, KeycloakConfig, KeycloakAngularModule } from 'keycloak-angular';
import { OrderFormComponent } from './main/cart/cart/orderForm/order-form/order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowseInvoicesComponent } from './main/adminPanel/browseInvoices/browse-invoices/browse-invoices.component';
import {MatDividerModule} from '@angular/material/divider';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { EditInvoiceComponent } from './main/adminPanel/editInvoice/edit-invoice/edit-invoice.component';

registerLocaleData(localePl, 'pl-Pl');

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    FiltersComponent,
    ProductsComponent,
    FooterComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    OrderFormComponent,
    BrowseInvoicesComponent,
    EditInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatSidenavModule,
    MatSelectModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    FormsModule,
    MatSnackBarModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
  ],
  providers: [CookieService,{
    provide: KeycloakService,
    useValue: keycloakService
  },
  { provide: LOCALE_ID, useValue: "pl-Pl" }
],
 //bootstrap: [AppComponent]
 entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
  let keycloakConfig: KeycloakConfig = {
    url: 'http://localhost:8080/auth',
    realm: 'SynthPol',
    clientId: 'SynthPolAngularClient',   
    "credentials": {
    "secret": "b0678735-3e26-4be3-b0cc-d0b76325fa4f"
    }
  }
  keycloakService
  .init({config: keycloakConfig,  initOptions: {
    onLoad: 'check-sso',
    //silentCheckSsoRedirectUri: window.location.origin + '/silentCheck'
}})
 .then(() => {
  console.log('[ngDoBootstrap] bootstrap app');
  appRef.bootstrap(AppComponent);
})
.catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
}

}
