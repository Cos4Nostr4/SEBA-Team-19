import {Influencer} from "../../../client/src/frontend/data-objects/influencer";
import {Request} from "../../../client/src/frontend/data-objects/request";
import {Campaign} from "../../../client/src/frontend/data-objects/campaign";
import {Company} from "../../../client/src/frontend/data-objects/company";

const sampleInfluencers = require('../../src/database/sample-influencers.json');
const sampleRequests = require('../../src/database/sample-requests.json');
const sampleCampaigns = require('../../src/database/sample-campaigns.json');
const sampleCompanies = require('../../src/database/sample-companies.json');

let requestData, influencerData, companyData, campaignData;


export function getSampleInfluencers(): Influencer[] {
    if (!influencerData) {
        influencerData = populateInfluencerData();
    }
    return influencerData;
}

export function getSampleCompanies(): Company[] {
    if (!companyData) {
        companyData = populateCompanyData();
    }
    return companyData;
}

export function getSampleCampaigns(): Campaign[] {
    if (!campaignData) {
        campaignData = populateCampaignData();
    }
    return campaignData;
}

export function getSampleRequests(): Request[] {
    if (!requestData) {
        requestData = populateRequestData();
    }
    return requestData;
}

function populateInfluencerData(): any {
    return sampleInfluencers;
}

function populateCompanyData() {
    return sampleCompanies;
}

function populateCampaignData() {
    let companies = getSampleCompanies();

    sampleCampaigns.forEach((campaign) => {
        let companyName = campaign.company;
        let company = companies.find((company) => company.name == companyName);
        campaign.company = company;
    });
    sampleCampaigns.forEach((campaign) => delete campaign.categories);

    return sampleCampaigns;
}

function populateRequestData() {
    let campaigns: Campaign[] = getSampleCampaigns();
    let influencers = getSampleInfluencers();
    sampleRequests.forEach((request) => {
        let influencerId = request.influencer;
        let influencer = influencers.find((influencer) => influencer.uuid == influencerId);
        if (!influencer) {
            throw new Error("Could not fill sample request (ID:" + request.uuid + ") with influencer (ID:" + influencerId + ")")
        }
        request.influencer = influencer;

        let campaignTitle = request.campaign;
        let campaign = campaigns.find((campaigns) => campaigns.title == campaignTitle);
        if (!campaign) {
            throw new Error("Could not fill sample request (ID:" + request.uuid + ") with campaign (Title:" + campaignTitle + ")")
        }
        request.campaign = campaign;
    });
    sampleRequests.forEach((request) => delete request.campaign.categories);
    return sampleRequests;
}

