import {Influencer} from "../../../client/src/frontend/data-objects/influencer";
import {Database} from "../../src/backend/database/database";
import {deleteInfluencerData} from "../../src/database/influencer/influencer-reset";
import {resetDatabase} from "../../src/database/database-reset";
var request = require("request");

describe("Test Influencer backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const influencerUrl = "influencers";
    const influencerRepository = Database.connect().accessInfluencerRepository();

    beforeAll(async function (done) {
        await deleteInfluencerData();
        done();
    });

    afterAll(async function (done) {
        await resetDatabase();
        done();
    });

    describe("POST " + baseUrl + influencerUrl, function () {

        let insertedInfluencer = new Influencer("1", "dahoam", "genericToken");
        let params = {
            url: baseUrl + influencerUrl,
            form: {
                data: insertedInfluencer
            }
        };

        it("adds new influencer to empty collection", async function (done) {
            request.post(params, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let data = JSON.parse(body).data;
                expect(data).toEqual(insertedInfluencer.uuid);

                influencerRepository.getAllInfluencers(function (influencers: Influencer[], error: any) {
                    expect(influencers.length).toEqual(1);
                    let influencer = influencers[0];
                    expect(influencer).toEqual(insertedInfluencer);
                    expect(error).toBeNull();
                    done();
                });
            });
        });

        it("fails for inserting influencer twice", async function (done) {
            request.post(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toBe("Influencer for id '"+insertedInfluencer.uuid+"' already exists.");
                expect(JSON.parse(body).data).toBeNull();
                done();
            });
        });
    });
});