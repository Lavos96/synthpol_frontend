import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data/data.service';
import { InvoicePersonalInfo } from 'src/models/invoicePersonalInfo';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass']
})
export class OrderFormComponent implements OnInit, OnDestroy {

  orderForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, this.isPolishZipCode]),
    nip: new FormControl('', [this.isValidNipValidator.bind(this)]),
  });

  orderFormValidity: string;

  constructor(private router: Router,
    private dataService: DataService,
    private keyCloakService: KeycloakService) { }

  ngOnInit(): void {
    this.orderForm.statusChanges.subscribe((status) => {
      console.log('Status: ', status);
    })
  }

  onSubmit() {
    console.log('Submit');
    const orderPersonalInfo = new InvoicePersonalInfo(this.orderForm.controls['firstName'].value,
    this.orderForm.controls['lastName'].value,
    this.orderForm.controls['city'].value,
    this.orderForm.controls['street'].value,
    this.orderForm.controls['zipCode'].value,
    this.orderForm.controls['nip'].value,
    this.keyCloakService.getUsername());
    console.log('co wysyłamy: ', orderPersonalInfo);
    this.dataService.orderFormSubject.next(orderPersonalInfo);
    this.router.navigateByUrl('/checkout');
  }

  ngOnDestroy() {

  }

  isValidNip(nip) {
    if (typeof nip !== 'string')
      return false;

    nip = nip.replace(/[\ \-]/gi, '');

    let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    let controlNumber = parseInt(nip.substring(9, 10));
    let weightCount = weight.length;
    for (let i = 0; i < weightCount; i++) {
      sum += (parseInt(nip.substr(i, 1)) * weight[i]);
    }

    return sum % 11 === controlNumber;
  }

  isPolishZipCode(control: FormControl): { [s: string]: boolean } {
    const pattern = new RegExp('^[0-9]{2}\-[0-9]{3}')
    if (pattern.test(control.value)) {
      return null;
    } else {
      return { 'notValidZipCode': true };
    }
  }

  isValidNipValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value !== '') {
      if (this.isValidNip(control.value)) {
        return null
      } else {
        return { 'invalidNip': true }
      }
    }
  }

}
