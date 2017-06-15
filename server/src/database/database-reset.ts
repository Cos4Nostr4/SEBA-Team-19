import * as mongoose from "mongoose";
import {DatabaseConnection} from "../backend/database/database-connection";
import {offerSchema} from "../backend/offer/offer-schema";
var sampleOffers = require('./sample_offers.json');


let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Offer: any = connection.model("Offer", offerSchema);

Offer.remove(function (err: any) {
    if (err) {
        console.log(err);
    } else {

        console.log("Cleared Offer database");
    }
});

console.log("Loading sample offer in 'Offer' collection.");

let i = 0;
for (let offerData of sampleOffers) {
    let offer = new Offer(offerData);
    offer.save(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Stored Offer: " + JSON.stringify(offerData));
        }
        if (++i === sampleOffers.length) {
            process.exit();
        }
    })
}
