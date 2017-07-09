import {Influencer} from "../../../client/src/frontend/data-objects/influencer";
import {resetDatabase} from "../../src/database/database-reset";
import {expectEqualityOf} from "../equals-tester";
import {getSampleInfluencers} from "../samples/sample-data";
var request = require("request");

describe("Test Influencer backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const influencerUrl = "influencers";
    const sampleInfluencers = getSampleInfluencers;

    afterAll(async function (done) {
        await resetDatabase();
        done();
    });

    describe("PUT " + baseUrl + influencerUrl, function () {

        const id = "1";
        it("updates influencer with id " + id, async function (done) {
            let updatedInfluencer = new Influencer(id, "notExisting","1", "updatedValue", "updatedToken");
            let params = {
                url: baseUrl + influencerUrl + "/" + id,
                form: {
                    data: updatedInfluencer
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let data = JSON.parse(body).data;
                expectEqualityOf(data, updatedInfluencer);
                expect(error).toBeNull();
                done();

            });
        });

        it(" is idempotent", async function (done) {
            const idOfExistingInfluencer = "3";
            let existingInfluencer = sampleInfluencers().find((influencer) => influencer.uuid == idOfExistingInfluencer);
            let params = {
                url: baseUrl + influencerUrl + "/" + idOfExistingInfluencer,
                form: {
                    data: existingInfluencer
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let data = JSON.parse(body).data;
                expectEqualityOf(data, existingInfluencer);
                expect(error).toBeNull();
                done();

            });
        });

        it(" fails for updating non existing influencer", async function (done) {
            const nonExistingId = "123456789";
            let nonExistingInfluencer = new Influencer(nonExistingId, "notExisting"," 123", "notExisting", "notExisting");
            let params = {
                url: baseUrl + influencerUrl + "/" + nonExistingId,
                form: {
                    data: nonExistingInfluencer
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Influencer for id '" + nonExistingId + "' does not exist");
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();

            });
        });

        it(" fails for updating influencer with date with different id", async function (done) {
            const existingId = "2";
            let notExistingInfluencer = new Influencer("123456789", "notExisting", "123", "notExisting", "notExisting");
            let params = {
                url: baseUrl + influencerUrl + "/" + existingId,
                form: {
                    data: notExistingInfluencer
                }
            };

            request.put(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Updating influencer with id '"+existingId+"' is not allowed with data having different id");
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();

            });
        });
    });
});