import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {

  productsInCartCounter: number = 0;

  constructor(private dataService: DataService,
    private router: Router) { }

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

}
