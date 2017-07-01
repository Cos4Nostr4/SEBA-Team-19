import * as mongoose from "mongoose";
import {DatabaseConnection} from "../../backend/database/database-connection";
import {NameToIdStorage} from "../name-to-id-storage";
import {campaignSchema} from "../../backend/campaign/campaign-schema";

const sampleCampaigns = require('./sample-campaigns.json');

let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Campaign: any = connection.model("Campaign", campaignSchema);

export async function deleteCampaignData(printLog?: any) {
    const campaignDeletePromise = new Promise(resolve => Campaign.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            if (printLog) {
                console.log("Cleared Campaign database");
            }
            resolve(true);
        }
    }));
    await campaignDeletePromise;
}

export async function resetCampaignData(campaignIds: NameToIdStorage[], companyIds: NameToIdStorage[], printLog?: any) {
    await deleteCampaignData(printLog);

    let i = 0;
    const campaignPromise = new Promise(resolve => {
        for (let campaignData of sampleCampaigns) {
            let companyName = campaignData.company;
            let companyId = findCompanyIdForName(companyIds, companyName);
            let campaign = mapToCampaign(campaignData, companyId);

            campaign.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    campaignIds.push({name: campaign.title, id: campaign._id});
                }

                if (++i == sampleCampaigns.length) {
                    if (printLog) {
                        console.log("Stored " + i + " campaigns");
                    }
                    resolve(true);
                }
            })
        }
    });
    await campaignPromise;
}
function findCompanyIdForName(companyIds: NameToIdStorage[], companyName: string) {
    let matchingCompany = companyIds.find(company => company.name == companyName);
    if (!matchingCompany) {
        throw new Error("Cannot find the id for company with name '" + companyName + "'. Check if you have written it correctly.");
    }
    let companyId = matchingCompany.id;
    return companyId;
}

function mapToCampaign(campaignData: any, companyId: string) {
    let startDate = new Date(campaignData.startDate);
    startDate.setHours(1, 0, 0);
    let endDate = new Date(campaignData.endDate);
    endDate.setHours(1, 0, 0);
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
        categories: campaignData.categories,
        stillRunning: campaignData.stillRunning
    });
    return campaign;
}
