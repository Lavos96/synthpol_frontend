import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data/data.service';
import { InvoicePersonalInfo } from 'src/models/invoicePersonalInfo';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvoicesService } from 'src/services/http/invoicesService.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.sass']
})
export class EditInvoiceComponent implements OnInit {

  element;

  editInvoiceForm = new FormGroup({
    issueDate: new FormControl('', [Validators.required]),
    deliverDate: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, this.isPolishZipCode]),
    nip: new FormControl('', []),
  });
  

  constructor(private dataService: DataService,
    private router: Router,
    private invoiceService: InvoicesService,
    private keyCloakService: KeycloakService) { }


  ngOnInit(): void {
    this.element = this.dataService.editInvoice;
    if(this.element===null || typeof(this.element)==='undefined'){
      console.log('Element: ', this.element);
      this.router.navigateByUrl('');
    } else {
    this.updateForm();
    }
    this.editInvoiceForm.statusChanges.subscribe(status=>{
      console.log('status: ', status);
    });
    this.editInvoiceForm.valueChanges.subscribe((value)=>{
      console.log('Value: ', value);
      console.log('checkIfValues: ', this.checkIfValuesAreDifferent())
      console.log('Form: ', this.editInvoiceForm);
    })
  }

  updateForm(){
    this.editInvoiceForm.patchValue({
      issueDate: this.element.issueDate,
      deliverDate: this.element.deliveryDate,
      name: this.element.name,
      city: this.element.city,
      street: this.element.street,
      zipCode: this.element.zipCode,
      nip: this.element.nip,
    })
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

  checkIfValuesAreDifferent(){
    if(this.element.name === this.editInvoiceForm.get('name').value && this.element.city === this.editInvoiceForm.get('city').value &&
    this.element.nip === this.editInvoiceForm.get('nip').value && this.element.street === this.editInvoiceForm.get('street').value &&
    this.element.zipCode === this.editInvoiceForm.get('zipCode').value){
      return true;
    } else {
      return false;
    }
  }

  onSubmit(){
    const invoice = {
      issueDate: this.element.issueDate,
      deliveryDate: this.element.deliverDate,
      NIP: this.editInvoiceForm.get('nip').value,
      name: this.editInvoiceForm.get('name').value,
      city: this.editInvoiceForm.get('city').value,
      street: this.editInvoiceForm.get('street').value,
      zipCode: this.editInvoiceForm.get('zipCode').value,
      username: this.keyCloakService.getUsername(),
      shallDisplay: true,
    };
    console.log('Obiekt do modyfikacji: ', invoice);
    this.invoiceService.editInvoice(null,invoice,this.element.invoiceId,false).subscribe(resp=>{
      console.log('Modified: ', resp);
      this.router.navigateByUrl('browseInvoices');
    })
  }

}
