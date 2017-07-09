export class Company{
    uuid:string;
    name:string;
    username:string;
    password:string;
    email:string;
    profilPicture:string;
    contact:string;
    address: string;
    paymentInformation:string;
    taxInformation:string;
    verified:boolean;


    constructor(uuid: string, name: string, username: string, password: string, email:string, profilPicture: string, contact: string, address: string, paymentInformation: string, taxInformation: string, verified: boolean) {
        this.uuid = uuid;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.profilPicture = profilPicture;
        this.contact = contact;
        this.address = address;
        this.paymentInformation = paymentInformation;
        this.taxInformation = taxInformation;
        this.verified = verified;
    }
}