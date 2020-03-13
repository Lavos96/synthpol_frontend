import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  constructor(private router: Router,
    private dataService: DataService) { }
  @Input() product: Product;

  ngOnInit(): void {
  }

  moveToDetails(){
    this.dataService.selectedProduct = this.product;
    this.router.navigateByUrl(`/product/${this.product.productId}`);
  }

}
