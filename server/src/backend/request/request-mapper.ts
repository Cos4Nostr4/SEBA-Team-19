import {DBRequest, RequestState} from "./db-request";

import {Request} from "../../../../client/src/frontend/data-objects/request";
export class RequestMapper {

    public static mapAll(dbRequests: DBRequest[]): Request[] {
        let requests = [];
        for (let dbRequest of dbRequests) {
            let request = this.map(dbRequest);
            requests.push(request)
        }
        return requests;
    }

    public static map(dbRequest: DBRequest): Request {
        return new Request(dbRequest.uuid, dbRequest.offer, dbRequest.influencer, RequestState[dbRequest.status], dbRequest.postponed);
    }
}