import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  constructor() { }
  @Input() product: Product;

  ngOnInit(): void {
  }

}
