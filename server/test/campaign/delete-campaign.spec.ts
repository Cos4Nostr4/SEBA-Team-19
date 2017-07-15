import {getSampleCampaigns} from "../samples/sample-data";
import {Database} from "../../src/backend/database/database";
import {resetDatabase} from "../../src/database/database-reset";
import {Campaign} from "../../../client/src/frontend/data-objects/campaign";
var request = require("request");


const campaignRepository = Database.connect().accessCampaignRepository();

let ensureCampaignWasDeleted = function (campaignId: string, done) {
    campaignRepository.getAllCampaigns((campaigns: Campaign[], error: any) => {
        expect(campaigns.length).toEqual(getSampleCampaigns().length - 1);
        let campaign = campaigns.find((campaign) => campaign.uuid == campaignId);
        if (campaign) {
            fail("Campaign with id " + campaignId + " was not deleted.");
        }
        expect(error).toBeNull();
        done();
    });
};
describe("Test Campaign backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const campaignsUrl = "campaigns";

    afterAll(async function (done) {
        await resetDatabase();
        done();
    });


    const campaignId = "2";
    describe("Delete " + baseUrl + campaignsUrl + "/" + campaignId, function () {
        it("deletes campaign with id " + campaignId, function (done) {
            request.delete(baseUrl + campaignsUrl + "/" + campaignId, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let campaignUuid = JSON.parse(body).data;
                let deleteError = JSON.parse(body).error;
                expect(deleteError).toBeNull();
                expect(campaignUuid).toEqual(campaignUuid);
                ensureCampaignWasDeleted(campaignId, done);
            });
        });

        it("is idempotent for non existing campaign ", function (done) {
            request.delete(baseUrl + campaignsUrl + "/" + campaignId, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let campaignUuid = JSON.parse(body).data;
                let deleteError = JSON.parse(body).error;
                expect(deleteError).toBeNull();
                expect(campaignUuid).toEqual(campaignUuid);
                ensureCampaignWasDeleted(campaignId, done);
            });
        });
    });

});