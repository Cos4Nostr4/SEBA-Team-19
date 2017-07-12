import {resetDatabase} from "../../src/database/database-reset";
import {expectEqualityOf} from "../equals-tester";
import {getSampleRequests} from "../samples/sample-data";
import {Database} from "../../src/backend/database/database";
import {Request} from "../../../client/src/frontend/data-objects/request";
import {RequestState} from "../../src/backend/request/db-request";
import {Influencer} from "../../../client/src/frontend/data-objects/influencer";
import {Campaign} from "../../../client/src/frontend/data-objects/campaign";
var request = require("request");

describe("Test Request backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const requestUrl = "requests";
    const sampleRequests = getSampleRequests();
    const requestRepository = Database.connect().accessRequestRepository();

    afterAll(async function (done) {
        await resetDatabase();
        done();
    });

    describe("PUT " + baseUrl + requestUrl, function () {

        const id = "1";
        it("updates request with id " + id, async function (done) {
            let requestToUpdate = sampleRequests.find((request) => request.uuid == id);
            let updatedRequest = new Request(id, requestToUpdate.campaign, requestToUpdate.influencer, RequestState[RequestState.PENDING], true);
            let params = {
                url: baseUrl + requestUrl + "/" + id,
                form: {
                    data: updatedRequest
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let request = JSON.parse(body).data;
                let startDate: Date = new Date(request.campaign.startDate);
                let endDate: Date = new Date(request.campaign.endDate);
                request.campaign.startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate());
                request.campaign.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate());
                expectEqualityOf(request, updatedRequest);
                expect(error).toBeNull();

                requestRepository.getAllRequests((requests: Request[], error: any) => {
                    expect(requests.length).toEqual(sampleRequests.length);
                    done();
                });

            });
        });

        it(" is idempotent", async function (done) {
            const idOfExistingRequest = "3";
            let existingRequest = sampleRequests.find((request) => request.uuid == idOfExistingRequest);
            let params = {
                url: baseUrl + requestUrl + "/" + idOfExistingRequest,
                form: {
                    data: existingRequest
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let request = JSON.parse(body).data;
                let startDate: Date = new Date(request.campaign.startDate);
                let endDate: Date = new Date(request.campaign.endDate);
                request.campaign.startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate());
                request.campaign.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate());
                expectEqualityOf(request, existingRequest);
                expect(error).toBeNull();
                done();

            });
        });

        const nonExistingId = "123456789";
        it(" fails for updating non existing request", async function (done) {
            let nonExistingRequest = new Request(nonExistingId, null, null, "notExisting", false);
            let params = {
                url: baseUrl + requestUrl + "/" + nonExistingId,
                form: {
                    data: nonExistingRequest
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Could not update request, because no request for id " + nonExistingId + " found");
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();

            });
        });

        it(" fails for updating request with date with different id", async function (done) {
            const existingId = "2";
            let notExistingInfluencer = new Request(nonExistingId, null, null, "notExisting", false);
            let params = {
                url: baseUrl + requestUrl + "/" + existingId,
                form: {
                    data: notExistingInfluencer
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Updating request with id '" + existingId + "' is not allowed with data having different id");
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();

            });
        });

        it(" fails for updating request with a different campaign", async function (done) {
            const existingId = "2";
            let differentCampaign = new Campaign("123456789", "", "", "", null, 0, 0, [], new Date, new Date, false);
            let updatedRequest = sampleRequests.find((request) => request.uuid == existingId);
            updatedRequest.campaign = differentCampaign;
            let params = {
                url: baseUrl + requestUrl + "/" + existingId,
                form: {
                    data: updatedRequest
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Rejected request update, because updating campaign reference is not allowed");
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();

            });
        });

        it(" fails for updating request with a different influencer", async function (done) {
            const existingId = "2";
            let differentInfluencer = new Influencer("123456789", "new", "new", "new", "new", "new");
            let updatedRequest = sampleRequests.find((request) => request.uuid == existingId);
            updatedRequest.influencer = differentInfluencer;
            let params = {
                url: baseUrl + requestUrl + "/" + existingId,
                form: {
                    data: updatedRequest
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Rejected request update, because updating influencer reference is not allowed");
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();

            });
        });
    });
});