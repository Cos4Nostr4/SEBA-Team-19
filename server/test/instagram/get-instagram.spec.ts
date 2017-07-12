import {RequestState} from "../../src/backend/request/db-request";
import {getSampleCampaigns, getSampleInfluencers, getSampleRequests} from "../samples/sample-data";
import {resetDatabase} from "../../src/database/database-reset";
import {deleteInfluencerData} from "../../src/database/influencer/influencer-reset";
var request = require("request");

describe("Test Campaign backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const instagramUrl = "instagram";
    const sampleInfluencers = getSampleInfluencers();
    const expectedCampaigns = getSampleCampaigns();
    const expectedRequests = getSampleRequests();

   /* afterAll(async function (done) {
        await resetDatabase();
        done();
    });*/

    const access_token = "xxx";
     describe("GET " + baseUrl + instagramUrl+"/login", async function () {
        //await deleteInfluencerData();
        xit("adds user when not existing yet", function (done) {
            request.get(baseUrl + instagramUrl, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let userData = JSON.parse(body).data;
                expect(userData).toEqual();

                /*campaignRepository.getAllCampaigns(function (campaigns: Campaign[], error: any) {
                    expect(campaigns.length).toEqual(1);
                    let campaign = campaigns[0];
                    expectEqualityOf(campaign, insertedCampaign);
                    expect(error).toBeNull();
                    done();
                });*/

                done();
            });
        });
    });

});