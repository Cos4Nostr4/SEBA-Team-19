import * as mongoose from "mongoose";
import {DatabaseConnection} from "../../backend/database/database-connection";
import {requestSchema} from "../../backend/request/request-schema";
import {NameToIdStorage} from "../name-to-id-storage";

const sampleRequests = require('./sample-requests.json');

let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Request: any = connection.model("Request", requestSchema);

export async function deleteRequestData(printLog?: any) {
    const requestDeletePromise = new Promise(resolve => Request.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            if (printLog) {
                console.log("Cleared Request database");
            }
            resolve(true);
        }
    }));
    await requestDeletePromise;
}

export async function resetRequestData(campaignIds: NameToIdStorage[], influencerIds: NameToIdStorage[], printLog?: any) {
    await deleteRequestData(printLog);

    let i = 0;
    const requestPromise = new Promise(resolve => {
        for (let sampleData of sampleRequests) {
            let campaignName = sampleData.campaign;
            let campaignId = findCampaignIdForName(campaignIds, campaignName);

            let influencerName = sampleData.influencer;
            let influencerId = findInfluencerIdForName(influencerIds, influencerName);
            let request = mapToRequest(sampleData, campaignId, influencerId);

            request.save(function (err: any) {
                if (err) {
                    console.log(err);
                }
                if (++i == sampleRequests.length) {
                    if (printLog) {
                        console.log("Stored " + i + " requests");
                    }
                    resolve(true);
                }
            });
        }
    });
    await requestPromise;
}
function findCampaignIdForName(campaignIds: NameToIdStorage[], campaignName: string) {
    let matchingCampaign = campaignIds.find(campaign => campaign.name == campaignName);
    if (!matchingCampaign) {
        throw new Error("Cannot find the id for campaign '" + campaignName + "'. Check if you have written it correctly.");
    }
    let campaignId = matchingCampaign.id;
    return  campaignId;
}

function findInfluencerIdForName(influencerIds: NameToIdStorage[], influencerName: string) {
    let matchingInfluencer = influencerIds.find(influencer => influencer.name == influencerName);
    if (!matchingInfluencer) {
        throw new Error("Cannot find the id for influencer with id '" + influencerName + "'. Check if you have written it correctly.");
    }
    let influencerId = matchingInfluencer.id;
    return  influencerId;
}

function mapToRequest(sampleData:any, campaignId:any, influencerId: any) {
    let request = new Request({
    uuid: sampleData.uuid,
        campaign: campaignId,
        influencer: influencerId,
        status: sampleData.status,
        postponed: sampleData.postponed
    });
    return request;
}
