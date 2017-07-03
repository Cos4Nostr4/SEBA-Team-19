import {Influencer} from "../../../client/src/frontend/data-objects/influencer";
import {Request} from "../../../client/src/frontend/data-objects/request";
import {Campaign} from "../../../client/src/frontend/data-objects/campaign";
import {Company} from "../../../client/src/frontend/data-objects/company";

const sampleInfluencers = require('../../src/database/influencer/sample-influencers.json');
const sampleRequests = require('../../src/database/request/sample-requests.json');
const sampleCampaigns = require('../../src/database/campaign/sample-campaigns.json');
const sampleCompanies = require('../../src/database/company/sample-companies.json');

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

    let mappedCampaigns = sampleCampaigns.map((campaign) => {
        let companyName = campaign.company;
        let company = companies.find((company) => company.name == companyName);
        let copiedCampaign = Object.assign({}, campaign);
        copiedCampaign.company = company;
        delete copiedCampaign.categories;
        return copiedCampaign;
    });

    return mappedCampaigns;
}

function populateRequestData() {
    let campaigns: Campaign[] = getSampleCampaigns();
    let influencers = getSampleInfluencers();
    let mappedRequests = sampleRequests.map((request) => {
        let copiedRequest = Object.assign({}, request);

        let influencerId = request.influencer;
        let influencer = influencers.find((influencer) => influencer.uuid == influencerId);
        if (!influencer) {
            throw new Error("Could not fill sample request (ID:" + request.uuid + ") with influencer (ID:" + influencerId + ")")
        }
        copiedRequest.influencer = influencer;

        let campaignTitle = request.campaign;
        let campaign = campaigns.find((campaigns) => campaigns.title == campaignTitle);
        if (!campaign) {
            throw new Error("Could not fill sample request (ID:" + request.uuid + ") with campaign (Title:" + campaignTitle + ")")
        }
        copiedRequest.campaign = campaign;

        delete copiedRequest.campaign.categories;
        return copiedRequest;
    });
    return mappedRequests;
}

