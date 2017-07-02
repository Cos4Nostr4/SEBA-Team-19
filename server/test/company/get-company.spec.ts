var request = require("request");
import {getSampleCompanies} from "../samples/sample-data";

describe("Test Company backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const companiesUrl = "companies";
    const sampleCompanies = getSampleCompanies();

    describe("GET " + baseUrl + companiesUrl, function () {
        it("returns 200", function (done) {
            request.get(baseUrl + companiesUrl, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns all companies", function (done) {
            request.get(baseUrl + companiesUrl, function (error, response, body) {
                let companies = JSON.parse(body).data;
                companies.sort((c1, c2) => (+c1.uuid) - (+c2.uuid));
                let expectedCompanies = sampleCompanies;
                expect(companies).toEqual(expectedCompanies);
                done();
            });
        });
    });

    describe("GET " + baseUrl + companiesUrl + "/:id", function () {
        const companyUuid = 2;
        it("returns 200", function (done) {
            request.get(baseUrl + companiesUrl + "/" + companyUuid, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns company with id " + companyUuid, function (done) {
            request.get(baseUrl + companiesUrl + "/" + companyUuid, function (error, response, body) {
                let company = JSON.parse(body).data;
                let expectedCompany = sampleCompanies.find((company) => +company.uuid == companyUuid);
                expect(company).toEqual(expectedCompany);
                done();
            });
        });

        const notExistingCompanyId = 123456789;
        it("returns 400 for not existing company id", function (done) {
            request.get(baseUrl + companiesUrl + "/" + notExistingCompanyId, function (error, response, body) {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
        it("returns error message for not existing company id", function (done) {
            request.get(baseUrl + companiesUrl + "/" + notExistingCompanyId, function (error, response, body) {
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toBe("Cannot find Company for id '" + notExistingCompanyId + "'");
                done();
            });
        });
        it("returns empty data for not existing company id", function (done) {
            request.get(baseUrl + companiesUrl + "/" + notExistingCompanyId, function (error, response, body) {
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });
    });

});