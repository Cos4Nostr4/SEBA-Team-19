import {Database} from "../../src/backend/database/database";
import {Campaign} from "../../../client/src/frontend/data-objects/campaign";
import {Request} from "../../../client/src/frontend/data-objects/request";
import {expectEqualityOf} from "../equals-tester";
import {deleteRequestData} from "../../src/database/request/request-reset";
import {getSampleCampaigns, getSampleInfluencers} from "../samples/sample-data";
import {Influencer} from "../../../client/src/frontend/data-objects/influencer";
import {RequestState} from "../../src/backend/request/db-request";
import {resetDatabase} from "../../src/database/database-reset";
var request = require("request");


describe("Test Request backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const campaignsUrl = "requests";
    const requestRepository = Database.connect().accessRequestRepository();

    beforeAll(async function (done) {
        await deleteRequestData();
        done();
    });

    afterAll(async function (done) {
        await resetDatabase();
        done();
    });

    describe("POST " + baseUrl + campaignsUrl, function () {
        let linkedCampaign = getCampaignByTitle("Joop");
        let linkedInfluencer = getInfluencerById("2");
        let insertedRequest = new Request("1", linkedCampaign, linkedInfluencer, "ACCEPTED", false);
        let params = {
            url: baseUrl + campaignsUrl,
            form: {
                data: insertedRequest
            }
        };

        it("adds new request to empty collection", async function (done) {
            request.post(params, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let data = JSON.parse(body).data;
                expect(data).toEqual(insertedRequest.uuid);

                requestRepository.getAllRequests(function (requests: Request[], error: any) {
                    expect(requests.length).toEqual(1);
                    let request: any = requests[0];
                    request.status = RequestState[request.status];
                    let startDate = request.campaign.startDate;
                    let endDate = request.campaign.endDate;
                    request.campaign.startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate());
                    request.campaign.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate());
                    expectEqualityOf(request, insertedRequest);
                    expect(error).toBeNull();
                    done();
                });
            });
        });

        it("fails for adding campaign twice", async function (done) {
            request.post(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Campaign for id '" + insertedRequest.uuid + "' already exists.");

                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });

        let notExistingCampaign = new Campaign("123456789", "not existing", "not existing", "not existing", null, 5, 200, [], dateFor("2017-8-2"),
            dateFor("2018-1-1"), true);
        let requestWithNotExisitingCampaign = new Request("222", notExistingCampaign, linkedInfluencer, "ACCEPTED", false);
        let paramsForRequestWithNotExistingCampaign = {
            url: baseUrl + campaignsUrl,
            form: {
                data: requestWithNotExisitingCampaign
            }
        };
        it("fails if linked campaign does not exist", async function (done) {
            request.post(paramsForRequestWithNotExistingCampaign, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Cannot create request, because referenced campaign with id '"
                    + notExistingCampaign.uuid + "' does not exist.");

                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });

        let notExistingInfluencer = new Influencer("12356789", "not existing", "not existing");
        let requestWithNotExisitingInfluencer = new Request("222", linkedCampaign, notExistingInfluencer, "ACCEPTED", false);
        let paramsForRequestWithNotExistingInfluencer = {
            url: baseUrl + campaignsUrl,
            form: {
                data: requestWithNotExisitingInfluencer
            }
        };
        it("fails if linked campaign does not exist", async function (done) {
            request.post(paramsForRequestWithNotExistingInfluencer, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Cannot create request, because referenced influencer with id '"
                    + notExistingInfluencer.uuid + "' does not exist.");

                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });

    });
});

function getCampaignByTitle(campaignTitle: string): Campaign {
    let campaigns = getSampleCampaigns();
    let matchedCampaign = campaigns.find((campaign) => campaign.title == campaignTitle);
    return matchedCampaign;
}

function getInfluencerById(influencerId: string): Influencer {
    let influencers = getSampleInfluencers();
    let influencer = influencers.find((influencer) => influencer.uuid == influencerId);
    return influencer;
}
function dateFor(dateString: string): Date {
    return new Date(dateString);
}