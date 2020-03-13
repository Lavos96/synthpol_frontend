import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/http/productsService.service';
import { DataService } from 'src/services/data/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
