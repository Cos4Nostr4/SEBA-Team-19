import {deleteCompanyData} from "../../src/database/company/company-reset";
import {resetDatabase} from "../../src/database/database-reset";
import {Database} from "../../src/backend/database/database";
import {Company} from "../../../client/src/frontend/data-objects/company";
var request = require("request");

describe("Test Company backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const companiesUrl = "companies";
    const companyRepository = Database.connect().accessCompanyRepository();

    beforeAll(async function (done) {
        await deleteCompanyData();
        done();
    });

    afterAll(async function (done) {
        await resetDatabase();
        done();
    });

    describe("POST " + baseUrl + companiesUrl, function () {

        let insertedCompany = new Company("1", "Arnulf", "Arnulf", "secret", "nope", "contct", "dahoam", "taxes", "taxes2", true);
        let params = {
            url: baseUrl + companiesUrl,
            form: {
                data: insertedCompany
            }
        };

        it("adds new company to empty collection", async function (done) {
            request.post(params, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                let data = JSON.parse(body).data;
                expect(data).toEqual(insertedCompany.uuid);

                companyRepository.getAllCompanies(function (companies: Company[], error: any) {
                    expect(companies.length).toEqual(1);
                    let company = companies[0];
                    expect(company).toEqual(insertedCompany);
                    expect(error).toBeNull();
                    done();
                });
            });
        });

        it("fails for inserting company twice", async function (done) {
            request.post(params, function (error, response, body) {
                expect(response.statusCode).toEqual(400);
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toBe("Company for id '"+insertedCompany.uuid+"' already exists.");
                expect(JSON.parse(body).data).toBeNull();
                done();
            });
        });
    });
});