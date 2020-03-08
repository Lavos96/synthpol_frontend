import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProvidersService } from 'src/services/http/providersService.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit {

  providers = [];

  constructor(private providersService: ProvidersService) { }

  ngOnInit(): void {
    const params= null;
    this.providersService.getProvidersList(params,true).subscribe((data)=>{
      this.providers = data;
      console.log('Providers: ', data);
    });
    this.providersService.getProviderById(params,1,true).subscribe((data)=>{
      console.log('Provider By ID: ', data);
    })
  }

}
