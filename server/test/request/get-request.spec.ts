import {getSampleRequests} from "../samples/sample-data";
var request = require("request");

describe("Test Request backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const requestUrl = "requests";
    let expectedRequests = getSampleRequests();

    describe("GET " + baseUrl + requestUrl, function () {
        it("returns 200", function (done) {
            request.get(baseUrl + requestUrl, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns all requests", function (done) {
            request.get(baseUrl + requestUrl, function (error, response, body) {
                let requests = JSON.parse(body).data;
                requests.forEach((request) => {
                    let startDate: Date = new Date(request.campaign.startDate);
                    let endDate: Date = new Date(request.campaign.endDate);
                    request.campaign.startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate());
                    request.campaign.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate());
                });

                expect(requests).toEqual(expectedRequests);
                done();
            });
        });
    });

    describe("GET " + baseUrl + requestUrl + "/:id", function () {
        const requestId = 2;
        it("returns 200", function (done) {
            request.get(baseUrl + requestUrl + "/" + requestId, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns request with id " + requestId, function (done) {
            request.get(baseUrl + requestUrl + "/" + requestId, function (error, response, body) {
                let request = JSON.parse(body).data;
                let startDate: Date = new Date(request.campaign.startDate);
                let endDate: Date = new Date(request.campaign.endDate);
                request.campaign.startDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate());
                request.campaign.endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate());

                let expectedRequest = expectedRequests.find((request) => +request.uuid == requestId);
                expect(request).toEqual(expectedRequest);
                done();
            });
        });

        const notExistingRequestId = 123456789;
        it("returns 400 for not existing request id", function (done) {
            request.get(baseUrl + requestUrl + "/" + notExistingRequestId, function (error, response, body) {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
        it("returns error message for not existing request id", function (done) {
            request.get(baseUrl + requestUrl + "/" + notExistingRequestId, function (error, response, body) {
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toBe("Cannot find Request for id '" + notExistingRequestId + "'");
                done();
            });
        });
        it("returns empty data for not existing request id", function (done) {
            request.get(baseUrl + requestUrl + "/" + notExistingRequestId, function (error, response, body) {
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });
    });
});
