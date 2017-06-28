import * as mongoose from "mongoose";
import {DatabaseConnection} from "../backend/database/database-connection";
import {campaignSchema} from "../backend/campaign/campaign-schema";
import {requestSchema} from "../backend/request/request-schema";
import {NameToIdStorage} from "./name-to-id-storage";
import {influencerSchema} from "../backend/influencer/influencer-schema";
import {companySchema} from "../backend/company/company-schema";
const sampleCampaigns = require('./sample-campaigns.json');
const sampleRequests = require('./sample-requests.json');
const sampleInfluencers = require('./sample-influencers.json');
const sampleCompanies = require('./sample-companies.json');

let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Campaign: any = connection.model("Campaign", campaignSchema);
let Request: any = connection.model("Request", requestSchema);
let Influencer: any = connection.model("Influencer", influencerSchema);
let Company: any = connection.model("Company", companySchema);

async function doit() {
    const campaignDeletePromise = new Promise(resolve => Campaign.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared Campaign database");
            resolve(true);
        }
    }));
    await campaignDeletePromise;

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

    console.log("Loading sample campaign in 'Campaign' collection.");


    let i = 0;
    let companyIds: NameToIdStorage[] = [];
    const companyPromise = new Promise(resolve => {
        for (let sampleData of sampleCompanies) {
            let company = new Company(sampleData);
            company.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    companyIds.push({name: company.name, id: company._id});
                }

                if (++i == sampleCompanies.length) {
                    console.log("Stored "+i + " companies");
                    resolve(true);
                }
            })
        }
    });
    await  companyPromise;

    i = 0;
    let campaignIds: NameToIdStorage[] = [];
    const campaignPromise = new Promise(resolve => {
        for (let campaignData of sampleCampaigns) {
            let matchingCompany = companyIds.find(company => company.name == campaignData.company);
            if (!matchingCompany) {
                throw new Error("Cannot find the id for company with name '" + campaignData.company + "'. Check if you have written it correctly.");
            }
            let companyId = matchingCompany.id;

            let startDate = new Date(campaignData.startDate);
            startDate.setHours(1,0,0);
            let endDate = new Date(campaignData.endDate);
            endDate.setHours(1,0,0);
            let campaign = new Campaign({
                uuid: campaignData.uuid,
                title: campaignData.title,
                description: campaignData.description,
                image: campaignData.image,
                company: companyId,
                amount: campaignData.amount,
                requiredNumberOfFollowers: campaignData.requiredNumberOfFollowers,
                enforcedHashTags: campaignData.enforcedHashTags,
                startDate: startDate,
                endDate: endDate,
                categories:campaignData.categories,
                stillRunning: campaignData.stillRunning
            });
            campaign.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    campaignIds.push({name: campaign.title, id: campaign._id});
                }
                i++;
                if (i == sampleCampaigns.length) {
                    console.log("Stored "+i + " campaigns");
                    resolve(true);
                }
            })
        }
    });
    await campaignPromise;

    i = 0;
    let influencerIds: NameToIdStorage[] = [];
    const influencerPromise = new Promise(resolve => {
        for (let sampleData of sampleInfluencers) {
            let influencer = new Influencer(sampleData);
            influencer.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    influencerIds.push({name: influencer.uuid, id: influencer._id});
                }

                if (++i == sampleInfluencers.length) {
                    console.log("Stored "+i + " influencer");
                    resolve(true);
                }
            })
        }
    });
    await  influencerPromise;

    i = 0;
    const requestPromise = new Promise(resolve => {
        for (let sampleData of sampleRequests) {
            let matchingCampaign = campaignIds.find(campaign => campaign.name == sampleData.campaign);
            if (!matchingCampaign) {
                throw new Error("Cannot find the id for campaign '" + sampleData.campaign + "'. Check if you have written it correctly.");
            }
            let campaignId = matchingCampaign.id;

            let matchingInfluencer = influencerIds.find(influencer => influencer.name == sampleData.influencer);
            if (!matchingInfluencer) {
                throw new Error("Cannot find the id for influencer with id '" + sampleData.influencer + "'. Check if you have written it correctly.");
            }
            let influencerId = matchingInfluencer.id;

            let request = new Request({
                uuid: sampleData.uuid,
                campaign: campaignId,
                influencer: influencerId,
                status: sampleData.status,
                postponed: sampleData.postponed
            });
            request.save(function (err: any) {
                if (err) {
                    console.log(err);
                }
                if (++i == sampleRequests.length) {
                    console.log("Stored "+i + " requests");
                    resolve(true);
                }
            });
        }
    });
    await requestPromise;

    process.exit(0);
}

doit();

