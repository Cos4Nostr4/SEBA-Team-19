import {DBRequest, RequestState} from "./db-request";
import {Request} from "../../../../client/src/frontend/data-objects/request";
import {OfferMapper} from "../offer/offer-mapper";

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
        let offer = OfferMapper.map(dbRequest.offer);
        return new Request(dbRequest.uuid, offer, dbRequest.influencer, RequestState[dbRequest.status], dbRequest.postponed);
    }
}