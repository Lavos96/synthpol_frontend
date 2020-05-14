export class InvoicePersonalInfo {
    //firstName: string;
    //lastName: string;
    name: string;
    city: string;
    street: string;
    zipCode: string;
    nip: string;
    username: string;
    constructor(firtName, lastName, city, street, zipCode, nip, username) {
        this.name = firtName +' '+ lastName;
        this.city = city;
        this.street = street;
        this.zipCode = zipCode;
        this.nip = nip;
        this.username = username;
    }
}