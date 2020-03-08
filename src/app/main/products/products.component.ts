import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductsService } from 'src/services/http/productsService.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  products = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    const params = null;
    this.productService.getProductsList(params,true).subscribe((data)=>{
      this.products = data;
      console.log('Co przyszło: ', data);
    });
    this.productService.getProductById(params,1,true).subscribe((product)=>{
      console.log('By ID: ', product);
    })
  }

}
