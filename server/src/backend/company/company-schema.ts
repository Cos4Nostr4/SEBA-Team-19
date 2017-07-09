import {Schema} from "mongoose";
export const companySchema: Schema = new Schema({
    uuid: String,
    name: String,
    username: String,
    password: String,
    email:String,
    profilPicture: String,
    contact: String,
    address: String,
    paymentInformation: String,
    taxInformation: String,
    verified: Boolean
});