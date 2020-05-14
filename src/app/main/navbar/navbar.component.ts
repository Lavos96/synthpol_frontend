import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data/data.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {

  productsInCartCounter: number = 0;

  constructor(public dataService: DataService,
    private router: Router,
    private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.dataService.cartSubject.subscribe(cart=>{
      if(cart.length >= 0){
        this.productsInCartCounter = cart.length;
      }
    })
  }

  navigateToCart(){
    this.router.navigateByUrl('/cart');
  }

  login(){
    this.keycloakService.login();
  }

  logout(){
    this.keycloakService.logout();
  }

  generate(){
    this.router.navigateByUrl('browseInvoices');
  }

}
