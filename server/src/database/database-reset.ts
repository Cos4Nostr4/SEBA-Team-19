import * as mongoose from "mongoose";
import {DatabaseConnection} from "../backend/database/database-connection";
import {offerSchema} from "../backend/offer/offer-schema";
import {requestSchema} from "../backend/request/request-schema";
import {NameToIdStorage} from "./name-to-id-storage";
import {influencerSchema} from "../backend/influencer/influencer-schema";
import {companySchema} from "../backend/company/company-schema";
const sampleOffers = require('./sample_offers.json');
const sampleRequests = require('./sample-requests.json');
const sampleCOmpanies = require('./sample-influencers.json');
const sampleCompanies = require('./sample-companies.json');

let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Offer: any = connection.model("Offer", offerSchema);
let Request: any = connection.model("Request", requestSchema);
let Influencer: any = connection.model("Influencer", influencerSchema);
let Company: any = connection.model("Company", companySchema);

async function doit() {
    const offerDeletePromise = new Promise(resolve => Offer.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared Offer database");
            resolve(true);
        }
    }));
    await offerDeletePromise;

    const requestDeletePromise = new Promise(resolve => Request.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared Request database");
            resolve(true);
        }
    }));
    await requestDeletePromise;

    const influencerDeletePromise = new Promise(resolve => Influencer.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared Influencer database");
            resolve(true);
        }
    }));
    await influencerDeletePromise;

    const companyDeletePromise = new Promise(resolve => Company.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared Company database");
            resolve(true);
        }
    }));
    await companyDeletePromise;

    console.log("Loading sample offer in 'Offer' collection.");


    let i = 0;
    let companyIds: NameToIdStorage[] = [];
    const companyPromise = new Promise(resolve => {
        for (let sampleData of sampleCompanies) {
            let company = new Company(sampleData);
            company.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Stored Company: " + JSON.stringify(company));
                    companyIds.push({name: company.username, id: company._id});
                }

                if (++i == sampleCompanies.length) {
                    resolve(true);
                }
            })
        }
    });
    await  companyPromise;

    i = 0;
    let offerIds: NameToIdStorage[] = [];
    const offerPromise = new Promise(resolve => {
        for (let offerData of sampleOffers) {
            let matchingCompany = companyIds.find(company => company.name == offerData.company);
            if (!matchingCompany) {
                throw new Error("Cannot find the id for company with name '" + offerData.company + "'. Check if you have written it correctly.");
            }
            let companyId = matchingCompany.id;

            let offer = new Offer({
                uuid: offerData.uuid,
                title: offerData.title,
                description: offerData.desciption,
                image: offerData.image,
                company: companyId,
                amount: offerData.amount,
                requiredNumberOfFollowers: offerData.requiredNumberOfFollowers,
                enforcedHashTags: offerData.enforcedHashTags,
                startDate: offerData.startDate,
                endDate: offerData.endDate,
                stillRunning: offerData.stillRunning
            });
            offer.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Stored Offer: " + JSON.stringify(offer));
                    offerIds.push({name: offer.title, id: offer._id});
                }
                i++;
                if (i == sampleOffers.length) {
                    resolve(true);
                }
            })
        }
    });
    await offerPromise;

    i = 0;
    let influencerIds: NameToIdStorage[] = [];
    const influencerPromise = new Promise(resolve => {
        for (let sampleData of sampleCOmpanies) {
            let influencer = new Influencer(sampleData);
            influencer.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Stored Influencer: " + JSON.stringify(influencer));
                    influencerIds.push({name: influencer.uuid, id: influencer._id});
                }

                if (++i == sampleCOmpanies.length) {
                    resolve(true);
                }
            })
        }
    });
    await  influencerPromise;

    i = 0;
    const requestPromise = new Promise(resolve => {
        for (let sampleData of sampleRequests) {
            let matchingOffer = offerIds.find(offer => offer.name == sampleData.offer);
            if (!matchingOffer) {
                throw new Error("Cannot find the id for offer '" + sampleData.offer + "'. Check if you have written it correctly.");
            }
            let offerId = matchingOffer.id;

            let matchingInfluencer = influencerIds.find(influencer => influencer.name == sampleData.influencer);
            if (!matchingInfluencer) {
                throw new Error("Cannot find the id for influencer with id '" + sampleData.influencer + "'. Check if you have written it correctly.");
            }
            let influencerId = matchingInfluencer.id;

            let request = new Request({
                uuid: sampleData.id,
                offer: offerId,
                influencer: influencerId,
                status: sampleData.status,
                postponed: sampleData.postponed
            });
            request.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Stored Request: " + JSON.stringify(request));
                }
                if (++i == sampleRequests.length) {
                    resolve(true);
                }
            });
        }
    });
    await requestPromise;

    process.exit(0);
}

doit();

