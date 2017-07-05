import {Database} from "../../src/backend/database/database";
import {deleteCampaignData} from "../../src/database/campaign/campaign-reset";
import {getSampleCompanies} from "../samples/sample-data";
import {Campaign} from "../../../client/src/frontend/data-objects/campaign";
import {Company} from "../../../client/src/frontend/data-objects/company";
import {expectEqualityOf} from "../equals-tester";
import {resetDatabase} from "../../src/database/database-reset";
var request = require("request");

describe("Test Campaign backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const campaignsUrl = "campaigns";
    const campaignRepository = Database.connect().accessCampaignRepository();

    beforeAll(async function (done) {
        await deleteCampaignData();
        done();
    });

    afterAll(async function (done) {
        await resetDatabase();
        done();
    });

    describe("POST " + baseUrl + campaignsUrl, function () {
        let linkedCompany = getCompanyForName("Burberry");
        let insertedCampaign = new Campaign("1", "Aftershave", "some aftershave", "imageUrl", linkedCompany, 1, 2000,
            ["after", "shave"], dateFor("2017-8-2"), dateFor("2018-1-1"), true);
        let params = {
            url: baseUrl + campaignsUrl,
            form: {
                data: insertedCampaign
            }
        };

        it("adds new campaign to empty collection", async function (done) {
            request.post(params, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let data = JSON.parse(body).data;
                expect(data).toEqual(insertedCampaign.uuid);

                campaignRepository.getAllCampaigns(function (campaigns: Campaign[], error: any) {
                    expect(campaigns.length).toEqual(1);
                    let campaign = campaigns[0];
                    expectEqualityOf(campaign, insertedCampaign);
                    expect(error).toBeNull();
                    done();
                });
            });
        });

        it("fails for adding campaign twice", async function (done) {
            request.post(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Campaign for id '" + insertedCampaign.uuid + "' already exists.");

                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });

        let notExistingCompany = new Company("1234567", "not existing", "not existing", "secret", "...", "contact", "secret",
        "taxes", "taxes", false);
        let incompleteCampaign = new Campaign("123456789", "Aftershave", "some aftershave", "imageUrl", notExistingCompany, 1, 2000,
            ["after", "shave"], dateFor("2017-8-2"), dateFor("2018-1-1"), true);
        let invalidParams = {
            url: baseUrl + campaignsUrl,
            form: {
                data: incompleteCampaign
            }
        };
        it("fails if linked company does not exist", async function (done) {
            request.post(invalidParams, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toEqual("Cannot create campaign, because referenced company with id '"
                    + notExistingCompany.uuid + "' does not exist.");

                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });
    });
});

function getCompanyForName(name: string): Company {
    let sampleCompanies = getSampleCompanies;
    let company = sampleCompanies().find((company) => company.name == name);
    return company;
}

function dateFor(dateString: string): Date {
    return new Date(dateString);
}