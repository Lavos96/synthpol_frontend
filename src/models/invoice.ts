import { InvoicePersonalInfo } from './invoicePersonalInfo';

export class Invoice {
    invoice: InvoicePersonalInfo;
    postOrders: [{ productId: number, quantityOfProducts: number }];
    constructor(invoice, postOrders) {
        this.invoice = invoice;
        this.postOrders = postOrders;
    }
}