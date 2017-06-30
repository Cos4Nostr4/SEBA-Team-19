const sampleInfluencers = require('../../src/database/sample-influencers.json');
const sampleRequestsData = require('../../src/database/sample-requests.json');
const sampleCampaigns = require('../../src/database/sample-campaigns.json');
const sampleCompanies = require('../../src/database/sample-companies.json');

let requestData;


function fillInReferences(requests: any, sampleInfluencers: any, sampleCampaigns: any, sampleCompanies: any) {
    requests.forEach((request) => {
        let influencerId = request.influencer;
        let influencer = sampleInfluencers.find((influencer) => influencer.uuid == influencerId);
        if (!influencer) {
            throw new Error("Could not fill sample request (ID:" + request.uuid + ") with influencer (ID:" + influencerId + ")")
        }
        request.influencer = influencer;

        let campaignTitle = request.campaign;
        let campaign = sampleCampaigns.find((campaigns) => campaigns.title == campaignTitle);
        if (!campaign) {
            throw new Error("Could not fill sample request (ID:" + request.uuid + ") with campaign (Title:" + campaignTitle + ")")
        }
        request.campaign = campaign;

        let companyName = request.campaign.company;
        if (!(typeof companyName === 'object')) {
            let company = sampleCompanies.find((company) => company.name == companyName);
            if (!company) {
                throw new Error("Could not fill sample request (ID:" + request.uuid + ") with company (Name:" + companyName + ")")
            }
            request.campaign.company = company;
        }
        console.log("!Request:"+JSON.stringify(request));
    });
    return requests;
}

function removeCategoriesTag(requests: any) {
    requests.forEach((request) => delete request.campaign.categories);
    return requests;
}

export function prepareRequestData(): any {
    console.log("PREPARE!!!!");
    if (!requestData) {
        console.log("PREPARE -> fill");
        let filledExpectedRequests = fillInReferences(sampleRequestsData, sampleInfluencers, sampleCampaigns, sampleCompanies);
        requestData = removeCategoriesTag(filledExpectedRequests);
    }
    return requestData;
}
