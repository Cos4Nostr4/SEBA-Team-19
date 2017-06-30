var request = require("request");
import {prepareRequestData} from "../samples/sample-data";

describe("Test Campaign backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const campaignsUrl = "campaigns";
    const sampleCompanies = require('../../src/database/sample-companies.json');
    const sampleCampaigns = require('../../src/database/sample-campaigns.json');
    const expectedCampaigns = fillInReferences(sampleCampaigns, sampleCompanies);
    removeCategoriesTag(expectedCampaigns);

    describe("GET " + baseUrl + campaignsUrl, function () {
        it("returns 200", function (done) {
            request.get(baseUrl + campaignsUrl, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns all campaigns", function (done) {
            request.get(baseUrl + campaignsUrl, function (error, response, body) {
                let campaigns = JSON.parse(body).data;
                campaigns.sort((c1, c2) => (+c1.uuid) - (+c2.uuid));
                campaigns.forEach((campaign) => {
                    let startDate: Date = new Date(campaign.startDate);
                    let endDate: Date = new Date(campaign.endDate);
                    campaign.startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate());
                    campaign.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate());
                });
                expect(campaigns).toEqual(expectedCampaigns);
                done();
            });
        });
    });

    describe("GET " + baseUrl + campaignsUrl + "/:id", function () {
        const campaignId = 1;
        it("returns 200 ", function (done) {
            request.get(baseUrl + campaignsUrl + "/" + campaignId, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns campaign for existing id " + campaignId, function (done) {
            request.get(baseUrl + campaignsUrl + "/" + campaignId, function (error, response, body) {
                let campaign = JSON.parse(body).data;
                let expectedCampaign = expectedCampaigns.find((campaign) => campaign.uuid == campaignId);
                let startDate: Date = new Date(campaign.startDate);
                let endDate: Date = new Date(campaign.endDate);
                campaign.startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate());
                campaign.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate());
                expect(campaign).toEqual(expectedCampaign);
                done();
            });
        });

        const notExistingCampaignId = 123456789;
        it("returns 400 for not existing influencer id", function (done) {
            request.get(baseUrl + campaignsUrl + "/" + notExistingCampaignId, function (error, response, body) {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
        it("returns error message for not existing influencer id", function (done) {
            request.get(baseUrl + campaignsUrl + "/" + notExistingCampaignId, function (error, response, body) {
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Cannot find Campaign for id '" + notExistingCampaignId + "'");
                done();
            });
        });
        it("returns empty data for not existing influencer id", function (done) {
            request.get(baseUrl + campaignsUrl + "/" + notExistingCampaignId, function (error, response, body) {
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });
    });

    describe("GET " + baseUrl + campaignsUrl + "/:id/requests", function () {
        const campaignId = 1;
        it("returns 200 ", function (done) {
            request.get(baseUrl + campaignsUrl + "/" + campaignId+"/requests", function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns requests for campaign  with id " + campaignId, function (done) {
            request.get(baseUrl + campaignsUrl + "/" + campaignId+"/requests", function (error, response, body) {
                let requests = JSON.parse(body).data;
                /*let campaignTitle = sampleCampaigns.find((campaign)=>campaign.uuid == campaignId).title;
                let expectedRequests = sampleRequests.filter((request) => {
                   return request.campaign == campaignTitle;
                });
                let startDate: Date = new Date(requests.startDate);
                let endDate: Date = new Date(requests.endDate);
                requests.startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate());
                requests.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate());
                expect(requests).toEqual(expectedRequests);*/
                done();
            });
        });

        /*const notExistingCampaignId = 123456789;
        it("returns 400 for not existing influencer id", function (done) {
            request.get(baseUrl + campaignsUrl + "/" + notExistingCampaignId+"/requests", function (error, response, body) {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
        it("returns error message for not existing influencer id", function (done) {
            request.get(baseUrl + campaignsUrl + "/" + notExistingCampaignId+"/requests", function (error, response, body) {
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Cannot find Campaign for id '" + notExistingCampaignId + "'");
                done();
            });
        });
        it("returns empty data for not existing influencer id", function (done) {
            request.get(baseUrl + campaignsUrl + "/" + notExistingCampaignId+"/requests", function (error, response, body) {
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });*/
    });

    function fillInReferences(campaigns: any, sampleCompanies: any) {
        let filledCampaigns = campaigns.map((campaign) => {
            let companyName = campaign.company;
            let company = sampleCompanies.find((company) => company.name == companyName);
            let clonedCampaign = {...campaign};
            clonedCampaign.company = company;
            return clonedCampaign;
        });
        return filledCampaigns;
    }

    function removeCategoriesTag(campaigns: any) {
        campaigns.forEach((campaign) => delete campaign.categories);
        return campaigns;
    }
});