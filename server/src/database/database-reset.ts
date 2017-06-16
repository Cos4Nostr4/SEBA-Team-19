import * as mongoose from "mongoose";
import {DatabaseConnection} from "../backend/database/database-connection";
import {offerSchema} from "../backend/offer/offer-schema";
import {Schema} from "mongoose";
import {requestSchema} from "../backend/request/request-schema";
const sampleOffers = require('./sample_offers.json');
const sampleRequests = require('./sample-requests.json');


let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Offer: any = connection.model("Offer", offerSchema);
let Request: any = connection.model("Request", requestSchema);

Offer.remove(function (err: any) {
    if (err) {
        console.log(err);
    } else {

        console.log("Cleared Offer database");
    }
});

Request.remove(function (err: any) {
    if (err) {
        console.log(err);
    } else {

        console.log("Cleared Request database");
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

        let request = new Request({uuid:"1", offer:offer._id});
        request.save(function (err: any) {
            if (err) {
                console.log(err);
            } else {
                console.log("Stored Request: " + JSON.stringify(request));
            }
        });
        i++
    })
}

/*for (let sampleData of sampleRequests) {
    let request = new Request(sampleData);
    request.save(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Stored Request: " + JSON.stringify(sampleData));
        }
        if (++i === sampleRequests.length + sampleOffers.length) {
            process.exit();
        }
    })
}*/
