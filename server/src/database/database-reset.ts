import * as mongoose from "mongoose";
import {DatabaseConnection} from "../backend/database/database-connection";
import {offerSchema} from "../backend/offer/offer-schema";
import {requestSchema} from "../backend/request/request-schema";
import {NameToIdStorage} from "./name-to-id-storage";
import {influencerSchema} from "../backend/influencer/influencer-schema";
const sampleOffers = require('./sample_offers.json');
const sampleRequests = require('./sample-requests.json');

let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Offer: any = connection.model("Offer", offerSchema);
let Request: any = connection.model("Request", requestSchema);
let Influencer: any = connection.model("Influencer", influencerSchema);

async function doit() {
    const offerPromise = new Promise(resolve => Offer.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared Offer database");
            resolve(true);
        }
    }));

    await offerPromise;

    const requestPromise = new Promise(resolve => Request.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared Request database");
            resolve(true);
        }
    }));

    await requestPromise;
    console.log("Loading sample offer in 'Offer' collection.");


    let i = 0;
    let offerIds: NameToIdStorage[] = [];
    for (let offerData of sampleOffers) {
        let offer = new Offer(offerData);
        offer.save(function (err: any) {
            if (err) {
                console.log(err);
            } else {
                console.log("Stored Offer: " + JSON.stringify(offer));
                offerIds.push({name: offer.title, id: offer._id});
            }
            i++;
            if (i == sampleOffers.length) {
                storeRequests(offerIds);
            }
        })
    }

    function storeRequests(offerIds: NameToIdStorage[]) {
        for (let sampleData of sampleRequests) {
            let matchingOffer = offerIds.find(offer => offer.name == sampleData.offer);
            if (!matchingOffer) {
                throw new Error("Cannot find the id for offer '" + sampleData.offer + "'. Check if you have written it correctly.");
            }
            let offerId = matchingOffer.id;
            let request = new Request({
                uuid: sampleData.id,
                offer: offerId,
                influencer: sampleData.influencer,
                status: sampleData.status,
                postponed: sampleData.postponed
            });
            request.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Stored Request: " + JSON.stringify(request));
                }
            });
        }
    }

    let influencer = new Influencer({uuid: 1, address: "dahoam", token: "12344321"});
    influencer.save(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Stored Influencer: " + JSON.stringify(influencer));
        }
    });
}

doit();

